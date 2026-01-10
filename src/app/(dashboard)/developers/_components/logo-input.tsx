"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { LuHammer } from "react-icons/lu";

type LogoInputProps = {
  defaultUrl?: string;
};

export const LogoInput = ({ defaultUrl }: LogoInputProps) => {
  const [logoUrl, setLogoUrl] = useState<string>(defaultUrl ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4")}>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border border-dashed w-full h-48 text-muted-foreground/50 hover:bg-muted flex flex-col items-center justify-center rounded gap-2",
        )}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt="Logo"
            className="w-full h-48 object-fill border rounded bg-background"
            width={400}
            height={400}
          />
        ) : (
          <>
            <LuHammer className="size-24" />
            <div className="text-sm">Click to upload</div>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        name="logo"
      />
    </div>
  );
};
