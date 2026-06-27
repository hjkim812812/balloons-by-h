"use client";

import { useEffect, useId, useRef, useState } from "react";

type DeliveryDateInputProps = {
  id: string;
  name: string;
  required?: boolean;
  min: string;
  className: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const MOBILE_MEDIA_QUERY = "(max-width: 768px)";
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDateString(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDisplayDate(date: string): string {
  return parseLocalDateString(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let index = 0; index < firstDay; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function MobileDeliveryDateInput({
  id,
  name,
  required,
  min,
  className,
  onChange,
  onBlur,
}: DeliveryDateInputProps) {
  const calendarId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const minDate = parseLocalDateString(min);
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    year: minDate.getFullYear(),
    month: minDate.getMonth(),
  }));

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!hostRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur?.(value);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onBlur, value]);

  function selectDate(dateString: string) {
    if (dateString < min) {
      return;
    }

    setValue(dateString);
    setOpen(false);
    onChange?.(dateString);
    onBlur?.(dateString);
  }

  function shiftMonth(delta: number) {
    setVisibleMonth((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const monthLabel = new Date(
    visibleMonth.year,
    visibleMonth.month,
    1
  ).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const monthGrid = getMonthGrid(visibleMonth.year, visibleMonth.month);

  return (
    <div ref={hostRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={calendarId}
        onClick={() => setOpen((current) => !current)}
        className={className}
      >
        {value ? formatDisplayDate(value) : "Select delivery date"}
      </button>
      {open && (
        <div
          id={calendarId}
          role="dialog"
          aria-label="Choose delivery date"
          className="absolute left-0 right-0 top-full z-50 mt-1 border border-champagne/20 bg-white p-3 shadow-[0_8px_24px_rgba(44,44,44,0.08)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => shiftMonth(-1)}
              className="flex h-8 w-8 items-center justify-center font-body text-sm text-charcoal transition-colors hover:text-champagne"
            >
              ‹
            </button>
            <span className="font-body text-sm text-charcoal">{monthLabel}</span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
              className="flex h-8 w-8 items-center justify-center font-body text-sm text-charcoal transition-colors hover:text-champagne"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {WEEKDAY_LABELS.map((label) => (
              <span
                key={label}
                className="py-1 text-center font-body text-[0.6rem] uppercase tracking-wide text-charcoal-soft"
              >
                {label}
              </span>
            ))}
            {monthGrid.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} aria-hidden="true" />;
              }

              const dateString = toLocalDateString(date);
              const isDisabled = dateString < min;
              const isSelected = value === dateString;

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={isDisabled}
                  aria-disabled={isDisabled}
                  aria-label={formatDisplayDate(dateString)}
                  onClick={() => selectDate(dateString)}
                  className={`flex h-9 w-full items-center justify-center rounded-none font-body text-sm transition-colors ${
                    isDisabled
                      ? "cursor-not-allowed text-charcoal-soft/35"
                      : isSelected
                        ? "bg-champagne text-ivory"
                        : "text-charcoal hover:bg-champagne/10"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function DeliveryDateInput(props: DeliveryDateInputProps) {
  const [useMobilePicker, setUseMobilePicker] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    setUseMobilePicker(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setUseMobilePicker(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (useMobilePicker === null) {
    return (
      <input
        id={props.id}
        name={props.name}
        type="date"
        required={props.required}
        min={props.min}
        onChange={(event) => props.onChange?.(event.target.value)}
        onBlur={(event) => props.onBlur?.(event.target.value)}
        className={props.className}
      />
    );
  }

  if (useMobilePicker) {
    return <MobileDeliveryDateInput {...props} />;
  }

  return (
    <input
      id={props.id}
      name={props.name}
      type="date"
      required={props.required}
      min={props.min}
      onChange={(event) => props.onChange?.(event.target.value)}
      onBlur={(event) => props.onBlur?.(event.target.value)}
      className={props.className}
    />
  );
}
