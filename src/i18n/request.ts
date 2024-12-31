/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "~/lib/Lang";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();

  return {
    locale: locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: "Asia/Amman",
  };
});
