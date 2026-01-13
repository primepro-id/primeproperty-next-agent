import Link from "next/link";
import { BanksTable } from "./_components";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";

export default function BanksPage() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">BANKS</h1>
        <Link href="/banks/new" className={cn(buttonVariants({}))}>
          <LuPlus /> ADD
        </Link>
      </div>
      <BanksTable />
    </div>
  );
}
