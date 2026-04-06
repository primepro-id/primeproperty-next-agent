"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuCheck, LuCirclePlus, LuSearch } from "react-icons/lu";
import { ChangeEvent, useRef, useState } from "react";
import { useProperties } from "@/hooks";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePropertyConfigurations } from "@/lib/api/properties/update-property-configurations";
import { Property } from "@/lib/api/properties/type";

export const AddDialog = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const typingTimeoutRef = useRef<any>(null);
  const properties = useProperties({ s: search });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef?.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

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
        toast.error(
          "Fail to update popular property, contact admin immediately",
        );
        return;
      } else {
        toast.success("Popular Properties Updated Successfully");
        queryClient.invalidateQueries({ queryKey: ["properties"] });
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error("Fail to update popular property, contact admin immediately");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <LuCirclePlus />
          <div className="flex items-center gap-1">
            <span className="hidden md:flex">Tambah</span>
            Properti
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="flex items-center w-full">
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "border-r-transparent rounded-r-none",
            )}
          >
            <LuSearch />
          </div>
          <Input
            ref={typingTimeoutRef}
            type="text"
            id="property-search"
            placeholder="id, judul, jalan"
            className="rounded-l-none border-l-transparent focus-visible:ring-transparent w-full"
            onChange={onChange}
          />
        </div>
        {search && Array.isArray(properties.data?.data?.data) ? (
          <div className="flex flex-col">
            {properties.data.data.data.map((property, index) => (
              <Button
                variant="ghost"
                key={`${index}_${property[0].id}_search`}
                className="justify-between h-fit"
                onClick={() =>
                  handleClick(property[0].id, {
                    configurations: {
                      ...property[0].configurations,
                      is_popular: !property[0].configurations.is_popular,
                    },
                  })
                }
              >
                <div className="flex items-center gap-4 max-w-60 text-wrap text-left">
                  <span>{property[0].id}</span>
                  <div className="flex flex-col">
                    <span>{property[0].title}</span>
                    <span className="text-xs text-muted-foreground">
                      {property[0].regency} {property[0].street}
                    </span>
                  </div>
                </div>

                <LuCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    property[0].configurations.is_popular
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center text-xs py-4">
            Type property id/title to add
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
