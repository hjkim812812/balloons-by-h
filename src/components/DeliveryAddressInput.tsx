"use client";

import { useEffect, useRef, useState } from "react";

type DeliveryAddressInputProps = {
  id: string;
  name: string;
  required?: boolean;
  className: string;
};

const CHARCOAL_SOFT = "#5A5A5A";
const CHAMPAGNE_BORDER = "rgba(194, 165, 107, 0.2)";
const CHECKOUT_FIELD_HEIGHT = "3rem";
const MOBILE_MEDIA_QUERY = "(max-width: 768px)";
const LOCATION_BIAS = {
  center: { lat: 34.0736, lng: -118.4004 },
  radius: 50000,
} as const;

const AUTOCOMPLETE_STYLES = `
  .delivery-address-autocomplete-host {
    position: relative;
    isolation: isolate;
    width: 100%;
  }

  .checkout-form .delivery-address-autocomplete-host gmp-place-autocomplete {
    width: 100%;
    height: ${CHECKOUT_FIELD_HEIGHT};
    min-height: ${CHECKOUT_FIELD_HEIGHT};
    color-scheme: light;
  }

  .checkout-form .delivery-address-autocomplete-host gmp-place-autocomplete::part(input) {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    min-height: ${CHECKOUT_FIELD_HEIGHT};
    padding: 0 1rem;
    font-family: var(--font-jost), system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: ${CHARCOAL_SOFT};
  }

  .checkout-form .delivery-address-autocomplete-host gmp-place-autocomplete::part(input)::placeholder {
    color: ${CHARCOAL_SOFT};
    opacity: 1;
  }

  @media (max-width: 768px) {
    .delivery-address-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10000;
      max-height: 40vh;
      overflow-y: auto;
      margin: 0;
      padding: 0;
      list-style: none;
      border: 1px solid ${CHAMPAGNE_BORDER};
      background: #fff;
      box-shadow: 0 8px 24px rgba(44, 44, 44, 0.08);
    }

    .delivery-address-suggestion-item {
      display: block;
      width: 100%;
      border: 0;
      background: transparent;
      padding: 0.75rem 1rem;
      text-align: left;
      font-family: var(--font-jost), system-ui, sans-serif;
      font-size: 0.875rem;
      line-height: 1.35;
      color: #2c2c2c;
      cursor: pointer;
    }

    .delivery-address-suggestion-item:active,
    .delivery-address-suggestion-item:hover {
      background: rgba(201, 169, 98, 0.1);
    }

    .delivery-address-suggestion-secondary {
      display: block;
      margin-top: 0.125rem;
      font-size: 0.75rem;
      color: #5a5a5a;
    }
  }
`;

function hasErrorClass(className: string) {
  return className.includes("checkout-field-error");
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
  element.style.height = CHECKOUT_FIELD_HEIGHT;
  element.style.minHeight = CHECKOUT_FIELD_HEIGHT;
  element.style.borderRadius = "0";
  element.style.colorScheme = "light";
  element.style.fontFamily = "var(--font-jost), system-ui, sans-serif";
  element.style.fontSize = "1rem";
  element.style.backgroundColor = "transparent";
  element.style.border = "none";
}

function FallbackAddressInput({
  id,
  name,
  required,
  className,
}: DeliveryAddressInputProps) {
  return (
    <input
      id={id}
      name={name}
      required={required}
      autoComplete="street-address"
      placeholder="Start typing your delivery address"
      className={className}
    />
  );
}

function MobilePlacesAutocomplete({
  id,
  name,
  required,
  className,
  apiKey,
}: DeliveryAddressInputProps & { apiKey: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.PlacePrediction[]
  >([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (!cancelled) {
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReady(false);
        }
      });

    return () => {
      cancelled = true;
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!hostRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  async function fetchSuggestions(input: string) {
    const trimmed = input.trim();
    if (!trimmed || !ready) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const requestId = ++requestIdRef.current;

    if (!sessionTokenRef.current) {
      const { AutocompleteSessionToken } = (await google.maps.importLibrary(
        "places"
      )) as google.maps.PlacesLibrary;
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    const { AutocompleteSuggestion } = (await google.maps.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;

    const { suggestions: nextSuggestions } =
      await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: trimmed,
        sessionToken: sessionTokenRef.current,
        includedRegionCodes: ["us"],
        locationBias: LOCATION_BIAS,
      });

    if (requestId !== requestIdRef.current) {
      return;
    }

    const predictions = nextSuggestions
      .map((suggestion) => suggestion.placePrediction)
      .filter(
        (prediction): prediction is google.maps.places.PlacePrediction =>
          Boolean(prediction)
      );

    setSuggestions(predictions);
    setOpen(predictions.length > 0);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(nextValue).catch(() => {
        setSuggestions([]);
        setOpen(false);
      });
    }, 250);
  }

  async function handleSelect(prediction: google.maps.places.PlacePrediction) {
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ["formattedAddress"] });
      const formatted =
        place.formattedAddress?.trim() || prediction.text.text.trim();
      setValue(formatted);
    } catch {
      setValue(prediction.text.text.trim());
    }

    setSuggestions([]);
    setOpen(false);
    sessionTokenRef.current = null;
  }

  return (
    <div ref={hostRef} className="delivery-address-autocomplete-host">
      <input
        id={id}
        name={name}
        required={required}
        value={value}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Start typing your delivery address"
        onChange={handleInputChange}
        onFocus={() => {
          if (suggestions.length > 0) {
            setOpen(true);
          }
        }}
        className={className}
      />
      {open && suggestions.length > 0 && (
        <ul className="delivery-address-suggestions" role="listbox">
          {suggestions.map((prediction) => {
            const mainText =
              prediction.mainText?.text ?? prediction.text.text ?? "";
            const secondaryText = prediction.secondaryText?.text ?? "";

            return (
              <li key={prediction.placeId} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected="false"
                  className="delivery-address-suggestion-item"
                  onClick={() => handleSelect(prediction)}
                >
                  {mainText}
                  {secondaryText ? (
                    <span className="delivery-address-suggestion-secondary">
                      {secondaryText}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function DesktopPlaceAutocomplete({
  id,
  name,
  className,
  apiKey,
}: DeliveryAddressInputProps & { apiKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef =
    useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const hasError = hasErrorClass(className);
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let selectListener: ((event: Event) => void) | null = null;
    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(async () => {
        if (cancelled || !containerRef.current) {
          return;
        }

        const { PlaceAutocompleteElement } = (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;

        const placeAutocomplete = new PlaceAutocompleteElement({
          includedRegionCodes: ["us"],
          locationBias: LOCATION_BIAS,
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
        containerRef.current.replaceChildren(placeAutocomplete);
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
      setUseFallback(true);
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
    <div className="delivery-address-autocomplete-host">
      <div className={`${className} ${useFallback ? "hidden" : "block !px-0"}`}>
        <div ref={containerRef} className="w-full" />
      </div>
      {useFallback && (
        <FallbackAddressInput
          id={id}
          name={name}
          required
          className={className}
        />
      )}
    </div>
  );
}

export function DeliveryAddressInput({
  id,
  name,
  required,
  className,
}: DeliveryAddressInputProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const [useMobileAutocomplete, setUseMobileAutocomplete] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const styleId = "delivery-address-autocomplete-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = AUTOCOMPLETE_STYLES;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    setUseMobileAutocomplete(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setUseMobileAutocomplete(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!apiKey) {
    return (
      <FallbackAddressInput
        id={id}
        name={name}
        required={required}
        className={className}
      />
    );
  }

  if (useMobileAutocomplete === null) {
    return (
      <FallbackAddressInput
        id={id}
        name={name}
        required={required}
        className={className}
      />
    );
  }

  if (useMobileAutocomplete) {
    return (
      <MobilePlacesAutocomplete
        id={id}
        name={name}
        required={required}
        className={className}
        apiKey={apiKey}
      />
    );
  }

  return (
    <DesktopPlaceAutocomplete
      id={id}
      name={name}
      required={required}
      className={className}
      apiKey={apiKey}
    />
  );
}
