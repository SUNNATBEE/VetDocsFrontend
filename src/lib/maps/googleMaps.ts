/**
 * Google Maps JS API lazy-loader (singleton).
 * Backend `/config/public` endpointidan kelgan brauzer kalitini ishlatadi.
 * Skript bir marta yuklanadi; takroriy chaqiriqlar bir xil Promise'ni qaytaradi.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// Minimal Google Maps shimlari — to'liq @types/google.maps qo'shmaslik uchun.
// Komponentlarda `google.maps.Map`, `Marker`, `InfoWindow`, va `LatLngBounds`
// ishlatiladi; barchasi konstruktor + bir nechta method orqali kiriladi.
export type GMap = any;
export type GMarker = any;
export type GInfoWindow = any;
export type GLatLngBounds = any;
export type GIcon = any;
export type GLatLngLiteral = { lat: number; lng: number };
export type GMapTypeStyle = {
  featureType?: string;
  elementType?: string;
  stylers: Array<Record<string, unknown>>;
};

export type GMapsNamespace = {
  maps: {
    Map: new (el: Element, options: Record<string, unknown>) => GMap;
    Marker: new (options: Record<string, unknown>) => GMarker;
    InfoWindow: new (options?: Record<string, unknown>) => GInfoWindow;
    LatLngBounds: new () => GLatLngBounds;
    Size: new (w: number, h: number) => unknown;
    Point: new (x: number, y: number) => unknown;
    Animation: { DROP: unknown; BOUNCE: unknown };
    SymbolPath: { CIRCLE: unknown };
    event: {
      trigger: (target: unknown, evt: string) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GMapsNamespace;
  }
}

let loadPromise: Promise<GMapsNamespace> | null = null;

export function loadGoogleMaps(apiKey: string): Promise<GMapsNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR'da Google Maps yuklanmaydi"));
  }
  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }
  if (!apiKey) {
    return Promise.reject(new Error("Google Maps API kaliti yo'q"));
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const cbName = `__vetGmapsReady_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    (window as unknown as Record<string, () => void>)[cbName] = () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
      if (window.google?.maps) resolve(window.google);
      else reject(new Error("Google Maps obyekti topilmadi"));
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      encodeURIComponent(apiKey) +
      `&callback=${cbName}&v=weekly&language=uz&region=UZ`;
    script.onerror = () => {
      delete (window as unknown as Record<string, unknown>)[cbName];
      loadPromise = null;
      reject(new Error("Google Maps skripti yuklanmadi"));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

export function esc(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
