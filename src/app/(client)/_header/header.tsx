"use client";
import { LogoLink } from "./logo-link";
import { HeaderSheet } from "./sheet";
import { Navigation } from "./navigation";
import ThemeButton from "./theme-button";

export const Header = () => {
  return (
    <div className="border-b border-primary ">
      <div className="flex items-center justify-between container mx-auto p-2 ">
        <div className="flex items-center justify-between lg:gap-2 w-full lg:w-fit">
          <LogoLink />

          <HeaderSheet />
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <Navigation />
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};
