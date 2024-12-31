import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
const Logo = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Link prefetch={true} href="https://alrefa3ee.me">
      {resolvedTheme === "dark" ? (
        <Image src="/dark.svg" width={380} height={110} alt="Logo" />
      ) : (
        <Image src="/logo.svg" width={380} height={110} alt="Logo" />
      )}
    </Link>
  );
};

export default Logo;
