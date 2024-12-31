"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { setUserLocale } from "~/lib/Lang";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useLocale } from "next-intl";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 mx-auto bg-secondary shadow-sm">
      <nav className="conatiner mx-auto flex w-full items-center justify-between py-8 lg:max-w-screen-lg">
        <Link href="/">
          <h2 className="relative w-min text-5xl font-bold">
            <span className="z-1 m-0 p-0">A</span>{" "}
            <span className="z-3 absolute left-6 m-0 p-0">3</span>
          </h2>
        </Link>
        <NavigationTab />
        <div className="flex items-center gap-2">
          {" "}
          <ModeToggle />
          <LanguageToggle />
        </div>
      </nav>
    </div>
  );
}
function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("local");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle language</span>
          <span>{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setUserLocale("en")}>
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserLocale("ar")}>
          {t("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("Theme");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("lightMode")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("darkMode")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("systemMode")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavigationTab() {
  const t = useTranslations("Header");
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn("items-list space-x-2 lg:space-x-8")}>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            {t("home")}
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/tags"
            className={navigationMenuTriggerStyle()}
          >
            {t("tags")}
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className={navigationMenuTriggerStyle()}
          >
            {t("about")}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    prefutch?: boolean;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={`${props.href}`}
          ref={ref}
          prefetch={props.prefutch}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
