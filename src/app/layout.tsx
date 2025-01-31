import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { getLocale, getMessages } from "next-intl/server";
import { GoogleTagManager } from '@next/third-parties/google'
import Header from "~/components/Header/Header";
import Providers from "~/components/Providers/Providers";
import { LangProvider } from "~/components/Providers/LangProvider";
import Footer from "~/components/footer";
export const metadata: Metadata = {
  title: "A3 Plog | Abdalmajeed's Personal Blog",
  description:
    "Welcome to A3 Plog – the personal blog of Abdalmajeed Alrefa3ee. A space where I share insights about web development, personal growth, and exciting projects. Join me in exploring the digital world!",
  authors: [{ name: "Abdalmajeed Alrefa3ee" }],
  keywords: [
    "Abdalmajeed Alrefa3ee",
    "alrefa3ee",
    "Personal Blog",
    "Full-Stack Developer",
    "Web Development",
    "Programming",
    "Backend",
    "Frontend",
    "Django",
    "React",
    "Next.js",
    "Software Development",
    "Portfolio",
  ],
  openGraph: {
    title: "A3 Plog | Abdalmajeed's Personal Blog",
    description:
      "Discover the journey of Abdalmajeed Alrefa3ee, a passionate full-stack developer, through his personal blog. Explore ideas, projects, and inspirations.",
    url: "https://alrefa3ee.me",
    siteName: "A3 Plog",
    images: [
      {
        url: "https://alrefa3ee.me/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A3 Plog - Abdalmajeed's Personal Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@alrefa3ee",
    title: "A3 Plog | Abdalmajeed's Personal Blog",
    description:
      "Dive into the thoughts and works of Abdalmajeed Alrefa3ee, a passionate full-stack developer with a love for building digital experiences.",
    images: ["https://alrefa3ee.me/twitter-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-T63ZS8SV"/>
      <body>
        <Providers>
          <LangProvider messages={messages} locale={locale}>
            <Header />
            <div className="my-8">{children}</div>
            <Footer />
          </LangProvider>
        </Providers>
      </body>
      
    </html>
  );
}
