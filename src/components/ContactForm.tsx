"use client";

import { useState } from "react";

const DELIVERY_TIME_OPTIONS = [
  { value: "10am-2pm", label: "10am – 2pm" },
  { value: "2pm-6pm", label: "2pm – 6pm" },
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const required = ["name", "email"];
    const newErrors: Record<string, boolean> = {};
    required.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) {
        newErrors[field] = true;
      }
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return;
      }
    } catch {
      return;
    }

    setErrors({});
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="border border-champagne/20 bg-white p-10 text-center md:p-14">
        <p className="font-display text-2xl text-charcoal">Thank you</p>
        <p className="mt-4 font-body text-sm text-charcoal-soft">
          We will be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 font-body text-[0.68rem] uppercase tracking-luxury text-champagne-dark underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-champagne/20 bg-white p-6 md:p-10"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
            Full Name <span className="text-champagne">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors.name ? "border-red-300" : "border-champagne/20"}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
            Email <span className="text-champagne">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors.email ? "border-red-300" : "border-champagne/20"}`}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
            Phone <span className="normal-case tracking-normal opacity-60">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(310) 000-0000"
            className="border border-champagne/20 bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="delivery-date" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
            Preferred Delivery Date
          </label>
          <input
            id="delivery-date"
            name="delivery-date"
            type="date"
            className="border border-champagne/20 bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="delivery-time" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
          Delivery Time
        </label>
        <select
          id="delivery-time"
          name="delivery-time"
          defaultValue=""
          className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors["delivery-time"] ? "border-red-300" : "border-champagne/20"}`}
        >
          <option value="" disabled>
            Select a window
          </option>
          {DELIVERY_TIME_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="details" className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
          Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          placeholder="Share your vision — venue, quantities, inspiration, or special requests."
          className="resize-y border border-champagne/20 bg-ivory px-4 py-3 font-body text-sm leading-relaxed outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15"
        />
      </div>

      <button
        type="submit"
        className="mt-8 w-full border border-champagne bg-champagne py-3.5 font-body text-[0.68rem] uppercase tracking-luxury text-ivory transition-all duration-500 hover:bg-champagne-dark md:w-auto md:px-12"
      >
        Send
      </button>
    </form>
  );
}
