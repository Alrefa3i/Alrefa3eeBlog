"use client";
import Link from "next/link";
import { Facebook, Twitter, Instagram, ArrowUp } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState<string | undefined>();

  useEffect(() => {
    setTheme(resolvedTheme); // Only set theme on the client
  }, [resolvedTheme]);

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-5">
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
      <footer className="container mx-auto bg-background text-foreground lg:max-w-screen-lg">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* About Section */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">About A3 Blog</h3>
              <p className="text-sm text-muted-foreground">
                Exploring life&apos;s adventures, one post at a time. Join me on
                this journey of discovery and inspiration.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Logo with Theme */}
            <Link prefetch={true} href="https://alrefa3ee.me">
              {theme === "dark" ? (
                <Image src="/dark.svg" width={380} height={110} alt="Logo" />
              ) : (
                <Image src="/logo.svg" width={380} height={110} alt="Logo" />
              )}
            </Link>
          </div>

          <Separator className="my-8" />

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            © {currentYear} A3 Personal Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
