"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FieldError, inputCls } from "./FormField";

/**
 * Address autocomplete — suggests US street addresses as the visitor types,
 * biased toward Connecticut (Terravian's market) without restricting other
 * states. Looks up via the site's own /api/address-suggest proxy (Photon /
 * OpenStreetMap behind it — no API key, debounced to stay well inside the
 * usage policy). If the lookup is unreachable the field degrades silently
 * to a plain text input.
 */

type Suggestion = { id: string; label: string };

const DEBOUNCE_MS = 250;
const MIN_CHARS = 3;

/** Bold the typed fragment inside a suggestion, Google-search style. */
function highlight(label: string, query: string) {
  const q = query.trim();
  if (!q) return label;
  const i = label.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return label;
  return (
    <>
      {label.slice(0, i)}
      <span className="font-bold">{label.slice(i, i + q.length)}</span>
      {label.slice(i + q.length)}
    </>
  );
}

/** Split "street, city, state…" into a strong first line + quiet rest. */
function splitLabel(label: string) {
  const i = label.indexOf(",");
  if (i === -1) return { primary: label, secondary: "" };
  return { primary: label.slice(0, i), secondary: label.slice(i + 1).trim() };
}

export function AddressField({
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  maxLength,
  hint,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const listId = `${id}-suggestions`;

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [searching, setSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Selecting a suggestion sets the value programmatically — that change
  // must NOT trigger a new lookup for the address just chosen.
  const justSelectedRef = useRef(false);

  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      setOpen(false);
      setSuggestions([]);
      return;
    }
    const q = value.trim();
    if (q.length < MIN_CHARS) {
      setSuggestions([]);
      setOpen(false);
      setSearching(false);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setSearching(true);
      try {
        const res = await fetch(
          `/api/address-suggest?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { suggestions?: Suggestion[] };
        const items = data.suggestions ?? [];
        setSuggestions(items);
        setOpen(true);
        setActive(-1);
      } catch {
        // Offline or aborted — the field keeps working as plain text.
      } finally {
        if (!ctrl.signal.aborted) setSearching(false);
      }
    }, DEBOUNCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const choose = (s: Suggestion) => {
    justSelectedRef.current = true;
    onChange(s.label);
    setOpen(false);
    setSuggestions([]);
    setSearching(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label htmlFor={id} className="block font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 text-earth" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-charcoal/75">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={name}
        type="text"
        required={required}
        value={value}
        maxLength={maxLength}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setOpen(true);
        }}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined
        }
        className={inputCls}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Suggested addresses"
          aria-busy={searching}
          className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-auto border-2 border-charcoal/30 bg-white py-1 shadow-[0_12px_28px_-12px_rgba(28,28,28,0.35)]"
        >
          {searching ? (
            <li className="px-4 py-3 text-sm text-charcoal/60" role="presentation">
              Searching addresses…
            </li>
          ) : null}
          {!searching && suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-charcoal/60" role="presentation">
              No matches — keep typing, or enter the address manually.
            </li>
          ) : null}
          {suggestions.map((s, i) => {
            const { primary, secondary } = splitLabel(s.label);
            return (
              <li key={s.id} role="presentation">
                <button
                  type="button"
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  aria-label={s.label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(s)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors duration-fast ${
                    i === active ? "bg-tint" : ""
                  }`}
                >
                  {/* Location pin — decorative; the row label carries the address */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    className={`mt-0.5 shrink-0 ${i === active ? "text-forest" : "text-charcoal/45"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold leading-snug text-charcoal">
                      {highlight(primary, value)}
                    </span>
                    {secondary ? (
                      <span className="block truncate text-[0.8125rem] leading-snug text-charcoal/60">
                        {secondary}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
