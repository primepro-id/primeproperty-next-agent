import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  PROPERTIES_TYPES,
  FOOTER_PROVINCE,
  FOOTER_STREET_HOME,
} from "./constant";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const PropertyNavigation = () => {
  return (
    <div className="w-[600px] p-4 border border-primary rounded flex flex-col gap-4">
      <h2 className="text-lg font-bold">PROPERTI</h2>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">TIPE</h3>
          <ul className="flex flex-col gap-2">
            {PROPERTIES_TYPES.map((tipe) => (
              <li key={tipe.key}>
                <Link
                  title={tipe.key}
                  href={tipe.value}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-start border border-primary hover:font-semibold",
                  )}
                >
                  {tipe.key.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">PROVINSI</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_PROVINCE.map((tipe) => (
              <li key={tipe.key} className="w-full">
                <Link
                  title={tipe.key}
                  href={tipe.value}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-start border border-primary hover:font-semibold",
                  )}
                >
                  {tipe.key.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">JALAN</h3>
          <ul className="flex flex-col gap-2">
            {FOOTER_STREET_HOME.map((tipe) => (
              <li key={tipe.key} className="w-full">
                <Link
                  title={tipe.key}
                  href={tipe.value}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-start border border-primary hover:font-semibold",
                  )}
                >
                  {tipe.key.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          PRIMEPRO INDONESIA {new Date().getFullYear()}
        </span>
        <Link
          href="/properties"
          className={cn(buttonVariants({ variant: "outline" }))}
          title="LIHAT SEMUA"
        >
          LIHAT SEMUA
          <IoIosArrowForward />
        </Link>
      </div>
    </div>
  );
};

export const Navigation = () => {
  const MENU = [
    {
      title: "AGEN",
      href: "/agents",
    },
    {
      title: "BLOG",
      href: "/blog",
    },
    {
      title: "KARIR",
      href: "/jobs",
    },
    {
      title: "FRANCHISE",
      href: "/franchise",
    },
    {
      title: "TENTANG",
      href: "/about",
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-sans">
            PROPERTI
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <PropertyNavigation />
          </NavigationMenuContent>
        </NavigationMenuItem>
        {MENU.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                title={item.title}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "font-sans",
                )}
              >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
