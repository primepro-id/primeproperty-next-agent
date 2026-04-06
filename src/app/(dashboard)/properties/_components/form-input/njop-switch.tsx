"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type NjopSwitchProps = {
  isNjopPrice?: boolean;
};

export const NjopSwitch = ({ isNjopPrice }: NjopSwitchProps) => {
  const [isActive, setIsActive] = useState(isNjopPrice);
  return (
    <div className="flex flex-col gap-2">
      <Label>Harga NJOP</Label>
      <div className="flex items-center gap-2">
        <Switch
          id="is_njop_price"
          name="is_njop_price"
          defaultChecked={isActive}
          onCheckedChange={setIsActive}
        />

        <span>{isActive ? "YES" : "NO"}</span>
      </div>
    </div>
  );
};
