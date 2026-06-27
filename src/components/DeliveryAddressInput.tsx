"use client";

import { useEffect, useRef } from "react";

type DeliveryAddressInputProps = {
  id: string;
  name: string;
  required?: boolean;
  className: string;
};

function loadGoogleMapsPlaces(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-google-maps="places"]'
  );

  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps")),
        { once: true }
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = "places";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

export function DeliveryAddressInput({
  id,
  name,
  required,
  className,
}: DeliveryAddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const styleId = "delivery-address-autocomplete-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = ".pac-container { z-index: 10000; }";
      document.head.appendChild(style);
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
    const input = inputRef.current;
    if (!apiKey || !input) {
      return;
    }

    let autocomplete: google.maps.places.Autocomplete | null = null;
    let listener: google.maps.MapsEventListener | null = null;
    let cancelled = false;

    loadGoogleMapsPlaces(apiKey)
      .then(() => {
        if (cancelled || !inputRef.current || !window.google?.maps?.places) {
          return;
        }

        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ["address"],
          componentRestrictions: { country: "us" },
          fields: ["formatted_address"],
        });

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete?.getPlace();
          const formatted = place?.formatted_address?.trim();
          if (formatted && inputRef.current) {
            inputRef.current.value = formatted;
          }
        });
      })
      .catch(() => {
        // Autocomplete unavailable; manual entry still works.
      });

    return () => {
      cancelled = true;
      listener?.remove();
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, []);

  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      required={required}
      autoComplete="street-address"
      className={className}
    />
  );
}
