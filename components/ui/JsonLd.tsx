/**
 * Renders a JSON-LD script tag from a centrally-built object (lib/schema.ts).
 * Objects are assembled from verified facts only — see that file's notes.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: data is built from our own
      // verified content objects, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
