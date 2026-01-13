"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBank } from "@/lib/api/banks";
import { deleteDeveloper, Developer } from "@/lib/api/developers";
import { cn } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";

type DeleteDialogProps = {
  row: Row<Developer>;
};

export const DeleteDialog = ({ row }: DeleteDialogProps) => {
  const onDeleteClick = async () => {
    try {
      const dev = await deleteBank(String(row.original.id));

      if (dev.data?.id) {
        toast.success("Bank deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      return;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete agent, please try again later");
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <LuTrash />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <div>
          <DialogTitle className="font-bold ">
            Delete bank &quot;{row.original.name}&quot;?
          </DialogTitle>
          <DialogDescription>
            This will also delete its entire propery listing.
          </DialogDescription>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Eh salah klik
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={onDeleteClick}
          >
            Yes, delete
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
