"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { ErrorIcon } from "@/components/ui/icons";

/**
 * Form field primitives — the single source of the label/error wiring
 * pattern: permanent visible label, programmatic association, per-field
 * error via aria-describedby + aria-invalid.
 */

export const inputCls =
  "mt-1.5 w-full border-2 border-charcoal/30 bg-white px-4 py-3 text-base text-charcoal transition-colors duration-fast focus:border-forest";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-2 text-sm font-semibold text-charcoal">
      <span className="mt-0.5 shrink-0 text-earth" aria-hidden="true">
        <ErrorIcon size={16} />
      </span>
      <span>
        <span className="font-bold">Error: </span>
        {message}
      </span>
    </p>
  );
}

export function TextField({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  error,
  autoComplete,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 text-earth" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputCls}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  rows = 5,
  maxLength,
  hint,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  maxLength?: number;
  hint?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
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
      <textarea
        id={id}
        name={name}
        required={required}
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined}
        className={inputCls}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  options,
  placeholder = "Select an option",
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-charcoal">
        {label}
        {required ? (
          <span className="ml-1 text-earth" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputCls}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}): ReactNode {
  return (
    <fieldset>
      <legend className="font-semibold text-charcoal">{legend}</legend>
      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((o) => (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-3 border-2 border-charcoal/25 bg-white px-4 py-3 transition-colors duration-fast has-[:checked]:border-forest has-[:checked]:bg-tint">
              <input
                type="checkbox"
                checked={selected.includes(o.value)}
                onChange={() => onToggle(o.value)}
                className="h-5 w-5 accent-forest"
              />
              <span className="font-medium text-charcoal">{o.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
