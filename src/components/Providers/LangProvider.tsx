"use client";

import * as React from "react";
import { NextIntlClientProvider } from "next-intl";

export function LangProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextIntlClientProvider>) {
  return <NextIntlClientProvider {...props}>{children}</NextIntlClientProvider>;
}
