"use client";
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

function Poster() {
  const { resolvedTheme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="relative mx-auto w-full">
      <div className="absolute mx-auto flex h-full w-full flex-col items-center justify-center gap-2 text-center">
        <h3 className="text-2xl">Developing A Good</h3>
        <h2 className="text-7xl">A3 Blog</h2>
        <span className="text-lg">By Abdulmajeed Alrefa3ee</span>
      </div>
      <div
        className={`absolute mx-auto flex h-full w-full items-center justify-center gap-2 text-center ${
          loading ? "hidden" : ""
        }`}
      >
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary-foreground"></div>
      </div>
      <Image
        src={
          resolvedTheme === "dark" ? "/dark-poster.png" : "/light-poster.png"
        }
        className="mx-auto"
        onLoad={() => setLoading(true)}
        width={1200}
        loading="eager"
        height={400}
        alt="Logo"
      />
    </div>
  );
}

export default Poster;
