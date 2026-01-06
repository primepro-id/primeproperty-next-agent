import { buttonVariants } from "@/components/ui/button";
import { Developer } from "@/lib/api/developers";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { LuPen } from "react-icons/lu";

export const TABLE_COLUMNS: ColumnDef<Developer>[] = [
  {
    accessorKey: "picture_url",
    header: "LOGO",
    cell: ({ row }) => {
      const picturePath = row.original.picture_url;
      const profilePicUrl = env.NEXT_PUBLIC_S3_ENDPOINT + picturePath;
      return (
        <Image
          src={profilePicUrl}
          alt={row.original.name}
          width={400}
          height={400}
          className="size-16 rounded"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "created_at",
    header: "CREATED AT",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "updated_at",
    header: "UPDATED AT",
    cell: ({ row }) =>
      new Date(row.original.updated_at).toLocaleDateString("id-ID"),
  },
  {
    accessorKey: "slug",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          href={`/developers/${row.original.id}`}
          title="edit"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <LuPen />
        </Link>
      </div>
    ),
  },
];
