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
import { AgentRole } from "@/lib/api/agents/type";
import { deleteProperty } from "@/lib/api/properties/delete-property";
import { Property } from "@/lib/api/properties/type";
import { deletePropertyImages } from "@/lib/s3/delete-property-images";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

import { LuX } from "react-icons/lu";
import { toast } from "react-toastify";

type DeleteDialogProps = {
  role?: AgentRole;
  property: Property;
};

export const DeleteDialog = ({ property, role }: DeleteDialogProps) => {
  const query = useQueryClient();
  const onDeleteClick = async () => {
    try {
      if (role === AgentRole.Admin) {
        const deletedImages = await deletePropertyImages(property.images);
        if (!deletedImages) {
          toast.error("Failed to delete property images, please try again");
          return;
        }
      }

      const oldProperty = await deleteProperty(property.id);
      if (oldProperty.status !== 200) {
        toast.error("Failed to delete property, please try again");
        return;
      }

      query.invalidateQueries({
        queryKey: ["properties"],
      });
      toast.success("Property deleted successfully");
      return;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property, please try again");
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        title="Delete"
      >
        <LuX />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <div>
          <DialogTitle className="font-bold ">Delete Property</DialogTitle>
          <DialogDescription>
            Do you want to delete &apos;{property.title}&apos;?{" "}
            {role === AgentRole.Admin &&
              "This will also the related leads data."}
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
