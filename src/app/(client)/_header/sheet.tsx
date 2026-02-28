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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SheetMenuProps = {
  onClick?: () => void
}

const SheetMenu = ({onClick}: SheetMenuProps) => {
  const MENU = [
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
      <Accordion type="multiple">
        <AccordionItem value="property" className="border-b-0">
          <AccordionTrigger className="p-4">Properti</AccordionTrigger>
          <AccordionContent className="border-y">
            <Link
              href="/properties"
              title="Semua Properti"
              className="p-4 pr-2 flex items-center justify-between hover:bg-primary text-foreground"
            >
              Semua Properti
              <IoIosArrowForward />
            </Link>
            <Link
              href="/properties/filter/dijual"
              title="Semua Properti Dijual"
              className="p-4 pr-2 flex items-center justify-between hover:bg-primary text-foreground"
            >
              Semua Properti Dijual
              <IoIosArrowForward />
            </Link>
            <Link
              href="/properties/filter/disewa"
              title="Semua Properti Disewa"
              className="p-4 pr-2 flex items-center justify-between hover:bg-primary text-foreground"
            >
              Semua Properti Disewa
              <IoIosArrowForward />
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {MENU.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          title={item.title}
          className="p-4 flex items-center justify-between hover:bg-primary"
          onClick={onClick}
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
        <SheetMenu onClick={closeSheet} />
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
