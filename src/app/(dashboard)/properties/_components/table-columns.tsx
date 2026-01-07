import { buttonVariants } from "@/components/ui/button";
import { AgentRole } from "@/lib/api/agents/type";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { formatDateToIndonesian } from "@/lib/date-time/format-date-to-indonesian";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuUserRound } from "react-icons/lu";
import { DeleteDialog } from "./delete-dialog";
import { formatToCurrencyUnit } from "@/lib/format-to-currency-unit";
import { PurchaseStatus } from "@/lib/enums/purchase-status";
import { RENT_TIME } from "@/lib/enums/rent-time";
import { MdWhatsapp } from "react-icons/md";

export const getTableColumns = (
  role?: AgentRole,
): ColumnDef<PropertyWithAgent>[] => {
  const s3Endpoint = env.NEXT_PUBLIC_S3_ENDPOINT;
  const columns: ColumnDef<PropertyWithAgent>[] = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => row.original[0].id,
    },
    {
      header: "Judul & Harga",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="font-semibold">{row.original[0].title}</p>
          <p className="text-muted-foreground">
            {formatToCurrencyUnit(
              row.original[0].price,
              row.original[0].currency,
            )}{" "}
            {row.original[0].purchase_status === PurchaseStatus.ForRent &&
              row.original[0].rent_time &&
              RENT_TIME[row.original[0].rent_time]}
          </p>
        </div>
      ),
    },
    {
      header: () => (
        <div className="flex gap-1">
          <span>Area</span>
          <span className="hidden md:flex">(Jalan, Kabupaten, Provinsi)</span>
        </div>
      ),
      accessorKey: "area",
      cell: ({ row }) => {
        const address = [
          row.original[0].street,
          row.original[0].regency,
          row.original[0].province,
        ].join(", ");
        return address;
      },
    },
    {
      header: "Sold/Available",
      accessorKey: "sold_status",
      cell: ({ row }) => {
        const status = row.original[0].sold_status;
        const channel = row.original[0].sold_channel;
        if (channel && AgentRole.Admin) {
          return status + " - " + channel;
        }

        return status;
      },
    },
    {
      header: "Created at",
      accessorKey: "created_at",
      cell: ({ row }) => {
        return formatDateToIndonesian(row.original[0].created_at, true);
      },
    },
  ];

  if (role === AgentRole.Admin) {
    columns.push({
      header: "Agent",
      accessorKey: "agent",
      cell: ({ row }) => {
        const picturePath = row.original[1].profile_picture_url;
        const profilePicUrl = s3Endpoint + picturePath;
        return (
          <div className="flex gap-2 items-center">
            <div className="size-8 overflow-hidden rounded-full border">
              {picturePath ? (
                <Image
                  src={profilePicUrl}
                  alt={picturePath}
                  className="h-full w-full object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <LuUserRound className="h-full w-full text-muted-foreground/50" />
              )}
            </div>
            <div className="flex flex-col text-xs">
              <span className="text-muted-foreground">
                {row.original[1].fullname}
              </span>
              <span>0{row.original[1].phone_number}</span>
            </div>
          </div>
        );
      },
    });
  }

  columns.push({
    header: "",
    accessorKey: "action",
    cell: ({ row }) => {
      const whatsappUrl = "https://api.whatsapp.com/send?text=";
      const text = `
        *${row.original[0].title}*\nLokasi: ${row.original[0].street},${row.original[0].regency}\n${row.original[0].description}\n\nContact:\n${row.original[1].instagram ? `https://instagram.com/${row.original[1].instagram}` : ""}\nWhatsapp:\nwa.me/62${row.original[1].phone_number}\nLink:\n${env.NEXT_PUBLIC_CLIENT_URL}/properties/${row.original[0].id}`;
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/properties/${row.original[0].id}`}
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
            title="Edit"
          >
            <LuPencil />
          </Link>
          <DeleteDialog property={row.original[0]} role={role} />
          <Link
            href={encodeURI(whatsappUrl + text)}
            target="_blank"
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
            title="Share"
          >
            <MdWhatsapp />
          </Link>
        </div>
      );
    },
  });

  return columns;
};
