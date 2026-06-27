"use client";

import { useEffect, useRef, useState } from "react";

type DeliveryAddressInputProps = {
  id: string;
  name: string;
  required?: boolean;
  className: string;
};

const IVORY = "#FAF8F5";
const CHAMPAGNE_BORDER = "rgba(194, 165, 107, 0.2)";
const ERROR_BORDER = "#fca5a5";

function hasErrorClass(className: string) {
  return className.includes("border-red-300");
}

function waitForImportLibrary(timeoutMs = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const started = Date.now();

    const check = () => {
      if (typeof window.google?.maps?.importLibrary === "function") {
        resolve();
        return;
      }

      if (Date.now() - started > timeoutMs) {
        reject(new Error("Google Maps failed to load"));
        return;
      }

      window.setTimeout(check, 50);
    };

    check();
  });
}

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (typeof window.google?.maps?.importLibrary === "function") {
    return Promise.resolve();
  }

  const bootstrapId = "google-maps-bootstrap";
  if (!document.getElementById(bootstrapId)) {
    const script = document.createElement("script");
    script.id = bootstrapId;
    script.textContent = `(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\${e}\`;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})(${JSON.stringify({ key: apiKey })});`;
    document.head.appendChild(script);
  }

  return waitForImportLibrary();
}

function applyAutocompleteStyles(
  element: google.maps.places.PlaceAutocompleteElement,
  hasError: boolean
) {
  element.style.width = "100%";
  element.style.display = "block";
  element.style.backgroundColor = IVORY;
  element.style.border = hasError
    ? `1px solid ${ERROR_BORDER}`
    : `1px solid ${CHAMPAGNE_BORDER}`;
  element.style.borderRadius = "0";
  element.style.colorScheme = "light";
  element.style.fontFamily = "var(--font-jost), system-ui, sans-serif";
  element.style.fontSize = "0.875rem";
}

export function DeliveryAddressInput({
  id,
  name,
  required,
  className,
}: DeliveryAddressInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef =
    useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const hasError = hasErrorClass(className);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const [useFallback, setUseFallback] = useState(!apiKey);

  useEffect(() => {
    const styleId = "delivery-address-autocomplete-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent =
        "gmp-place-autocomplete { width: 100%; color-scheme: light; }";
      document.head.appendChild(style);
    }

    const container = containerRef.current;
    if (!apiKey || !container) {
      setUseFallback(true);
      return;
    }

    let selectListener: ((event: Event) => void) | null = null;
    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(async () => {
        if (cancelled || !container) {
          return;
        }

        const { PlaceAutocompleteElement } = (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;

        const placeAutocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ["us"],
          locationBias: {
            center: { lat: 34.0736, lng: -118.4004 },
            radius: 50000,
          },
        });

        placeAutocomplete.id = id;
        placeAutocomplete.name = name;
        placeAutocomplete.placeholder = "Start typing your delivery address";
        applyAutocompleteStyles(placeAutocomplete, hasError);

        selectListener = async (event: Event) => {
          const { placePrediction } =
            event as google.maps.places.PlacePredictionSelectEvent;
          const place = placePrediction.toPlace();
          await place.fetchFields({ fields: ["formattedAddress"] });
          const formatted = place.formattedAddress?.trim();
          if (formatted) {
            placeAutocomplete.value = formatted;
          }
        };

        placeAutocomplete.addEventListener("gmp-select", selectListener);
        container.replaceChildren(placeAutocomplete);
        autocompleteRef.current = placeAutocomplete;
        setUseFallback(false);
      })
      .catch(() => {
        if (!cancelled) {
          setUseFallback(true);
        }
      });

    return () => {
      cancelled = true;
      const element = autocompleteRef.current;
      if (element && selectListener) {
        element.removeEventListener("gmp-select", selectListener);
        element.remove();
      }
      autocompleteRef.current = null;
      container.replaceChildren();
    };
  }, [apiKey, hasError, id, name]);

  useEffect(() => {
    const element = autocompleteRef.current;
    if (!element) {
      return;
    }

    applyAutocompleteStyles(element, hasError);
  }, [hasError]);

  return (
    <div ref={containerRef}>
      {useFallback && (
        <input
          id={id}
          name={name}
          required={required}
          autoComplete="street-address"
          className={className}
        />
      )}
    </div>
  );
}
