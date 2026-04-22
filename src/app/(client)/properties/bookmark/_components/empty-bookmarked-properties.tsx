import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuBookmark, LuHouse } from "react-icons/lu";

export const EmptyBookmarkedProperties = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full min-h-96">
      <LuHouse className="size-32" />
      <h4 className="text-lg font-semibold uppercase">No Saved Properties</h4>

      <p className="flex flex-wrap gap-1 items-center text-muted-foreground mb-4">
        Go to{" "}
        <Link href="/properties" className="underline">
          Properties
        </Link>{" "}
        and click <LuBookmark /> icon to save.
      </p>

      <Link
        href="/properties"
        className={cn(buttonVariants(), "font-sans font-bold")}
      >
        SEE PROPERTIES
      </Link>
    </div>
  );
};
