export type Locale = (typeof locales)[number];

export const locales = ["en", "ar"] as const;
export const defaultLocale: Locale =
  typeof window !== "undefined" ? (window.navigator.language as Locale) : "en";
