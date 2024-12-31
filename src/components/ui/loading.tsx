"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-2">
      <div className="h-3 w-3 animate-pulse rounded-full bg-foreground"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-foreground"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-foreground"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-foreground"></div>
    </div>
  );
}
