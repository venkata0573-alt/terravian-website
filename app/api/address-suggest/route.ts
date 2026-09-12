import { NextResponse } from "next/server";

/**
 * Address suggestions — server-side proxy to Photon (photon.komoot.io), the
 * OpenStreetMap-based autocomplete geocoder. No API key required. Keeping
 * the lookup server-side carries a compliant User-Agent, filters results to
 * the US, biases ranking toward Connecticut (Terravian's market) without
 * restricting it, and caches identical lookups for an hour.
 *
 * GET /api/address-suggest?q=21%20dudley
 * → { suggestions: [{ id, label }] }
 */

// Cheshire, CT (Terravian's office) — center used as the ranking bias
const BIAS_LAT = "41.50";
const BIAS_LON = "-72.90";
// Connecticut + immediate surroundings — local pass runs inside this box
// first so nearby addresses surface first, Google-Maps style; a nationwide
// pass fills in when the local one comes up short.
const LOCAL_BBOX = "-73.75,40.95,-71.75,42.10";

type Suggestion = { id: string; label: string };

async function queryPhoton(q: string, extra: Record<string, string>): Promise<Suggestion[]> {
  const params = new URLSearchParams({
    q,
    limit: "10",
    lang: "en",
    lon: BIAS_LON,
    lat: BIAS_LAT,
    ...extra,
  });
  const res = await fetch(`https://photon.komoot.io/api/?${params.toString()}`, {
    headers: {
      "Accept-Language": "en",
      "User-Agent": "TerravianLandscaping-Website/1.0 (info@terravianlandscaping.com)",
    },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`photon ${res.status}`);
  const data = (await res.json()) as { features?: PhotonFeature[] };
  return (data.features ?? [])
    .filter((f) => f.properties?.countrycode === "US")
    .map((f, i) => {
      const p = f.properties ?? {};
      return {
        id: `${p.osm_type ?? ""}${p.osm_id ?? i}`,
        label: labelFor(p),
      };
    })
    .filter((s) => s.label.length > 0);
}

type PhotonFeature = {
  properties?: {
    osm_type?: string;
    osm_id?: number;
    name?: string;
    housenumber?: string;
    street?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    postcode?: string;
    countrycode?: string;
  };
};

function labelFor(p: NonNullable<PhotonFeature["properties"]>): string {
  const streetLine = [p.housenumber, p.name ?? p.street].filter(Boolean).join(" ");
  const parts = [
    streetLine || p.name,
    p.city ?? p.district ?? p.county,
    p.state,
    p.postcode,
    "United States",
  ].filter(Boolean) as string[];
  // Drop consecutive duplicates (e.g. name === city)
  return parts.filter((part, i) => i === 0 || part !== parts[i - 1]).join(", ");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 200);

  if (q.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    // Local pass (CT region) first; nationwide pass tops up if needed.
    const local = await queryPhoton(q, { bbox: LOCAL_BBOX });
    const seen = new Set<string>(local.map((s) => s.label));
    let suggestions = local;
    if (local.length < 4) {
      const nationwide = await queryPhoton(q, {});
      suggestions = [...local];
      for (const s of nationwide) {
        if (seen.has(s.label)) continue;
        seen.add(s.label);
        suggestions.push(s);
        if (suggestions.length >= 6) break;
      }
    }
    suggestions = suggestions.slice(0, 6);

    return NextResponse.json(
      { suggestions },
      { headers: { "Cache-Control": "public, max-age=3600" } },
    );
  } catch {
    // Lookup unavailable — the form field keeps working as plain text.
    return NextResponse.json({ suggestions: [] });
  }
}
