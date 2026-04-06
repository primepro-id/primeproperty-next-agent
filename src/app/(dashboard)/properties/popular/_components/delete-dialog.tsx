"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { Property } from "@/lib/api/properties/type";
import { updatePropertyConfigurations } from "@/lib/api/properties/update-property-configurations";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { LuTrash } from "react-icons/lu";
import { toast } from "react-toastify";

type DeleteDialogProps = {
  row: Row<PropertyWithAgent>;
};

export const DeleteDialog = ({ row }: DeleteDialogProps) => {
  const queryClient = useQueryClient();

  const handleClick = async (
    propertyId: number,
    configurations: Pick<Property, "configurations">,
  ) => {
    try {
      const updatedProperty = await updatePropertyConfigurations(
        propertyId,
        configurations,
      );
      if (updatedProperty.status !== 200) {
        toast.error("Fail to remove property, contact admin immediately");
        return;
      } else {
        toast.success("Properties removed Successfully");
        queryClient.invalidateQueries({ queryKey: ["properties"] });
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("Fail to remove property, contact admin immediately");
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <LuTrash />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogTitle>
          Remove property {row.original[0].id} from popular property?
        </DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Eh salah klik
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={() =>
              handleClick(row.original[0].id, {
                configurations: {
                  ...row.original[0].configurations,
                  is_popular: false,
                },
              })
            }
          >
            Yes remove
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
