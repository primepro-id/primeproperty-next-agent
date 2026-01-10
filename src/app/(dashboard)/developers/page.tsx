import Link from "next/link";
import { DevelopersTable } from "./_components";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";

export default function DevelopersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">DEVELOPERS</h1>
        <Link href="/developers/new" className={cn(buttonVariants({}))}>
          <LuPlus /> ADD
        </Link>
      </div>
      <DevelopersTable />
    </div>
  );
}
