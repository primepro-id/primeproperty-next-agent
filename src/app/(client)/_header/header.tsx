"use client";
import Link from "next/link";
import { LogoLink } from "./logo-link";
import { HeaderSheet } from "./sheet";

export const Header = () => {
  return (
    <div className="flex items-center justify-between container mx-auto p-2 border-b border-primary">
      <LogoLink />

      <Link
        href="/"
        title="PrimePro Indonesia"
        aria-label="PrimePro Indonesia"
        className="text-xl font-bold"
      >
        PRIMEPRO INDONESIA
      </Link>
      <HeaderSheet />
    </div>
  );
};
