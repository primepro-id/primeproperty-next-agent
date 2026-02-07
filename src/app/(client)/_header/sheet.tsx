"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LogoLink } from "./logo-link";
import { useRef } from "react";
import { IoIosArrowForward, IoIosArrowUp, IoIosMenu } from "react-icons/io";
import Link from "next/link";
import ThemeButton from "./theme-button";

const SheetMenu = () => {
  const MENU = [
    {
      title: "Properti",
      href: "/properties",
    },
    {
      title: "Agen",
      href: "/agents",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Lowongan",
      href: "/jobs",
    },
    {
      title: "Franchise",
      href: "/franchise",
    },
    {
      title: "Tentang",
      href: "/about",
    },
  ];
  return (
    <div className="flex flex-col border-y border-primary ">
      {MENU.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          title={item.title}
          className="p-4 flex items-center justify-between hover:bg-primary"
        >
          {item.title}
          <IoIosArrowForward />
        </Link>
      ))}
    </div>
  );
};

export const HeaderSheet = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeSheet = () => {
    closeRef.current?.click();
  };
  return (
    <Sheet>
      <SheetTrigger
        aria-label="PrimePro Menu"
        title="Menu"
        className={cn(buttonVariants({ size: "icon" }), "lg:hidden")}
      >
        <IoIosMenu />
      </SheetTrigger>
      <SheetContent className="p-0" side="top">
        <SheetHeader className="flex-row items-center w-full justify-between space-y-0 p-2">
          <LogoLink onClickAction={closeSheet} />
          <SheetTitle className="text-xl">PRIMEPRO INDONESIA</SheetTitle>
          <SheetClose
            ref={closeRef}
            className={cn(buttonVariants({ size: "icon" }))}
          >
            <IoIosArrowUp />
          </SheetClose>
        </SheetHeader>
        <SheetDescription />
        <SheetMenu />
        <SheetFooter className="flex-row items-center justify-between w-full p-2">
          <span className="text-xs text-muted-foreground">
            PRIMEPRO INDONESIA {new Date().getFullYear()}
          </span>
          <ThemeButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
