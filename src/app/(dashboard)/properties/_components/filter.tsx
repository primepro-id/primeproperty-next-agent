"use client";
import Link from "next/link";
import { SearchFilter } from "./search-filter";
import { LuCirclePlus } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { ProvinceRegencySelect, ProvinceSelect } from "./form-input";
import { useRouter } from "next/navigation";
import { BpsDomain } from "@/lib/bps/find-bps-domain-province";
import { useState } from "react";
import { SoldFilter } from "./sold-filter";
import { useAgentTokenData } from "@/hooks/agents/use-agent-token-data";
import { AgentRole } from "@/lib/api/agents/type";
import { DeveloperFilter } from "./developer-filter";
import { BankFilter } from "./bank-filter";

type PropertyFilterProps = {
  searchParams: FindPropertyQuery;
};

export const PropertyFilter = ({ searchParams }: PropertyFilterProps) => {
  const router = useRouter();
  const agent = useAgentTokenData();
  const [provinceId, setProvinceId] = useState<string>("");

  const onProvinceChange = (bpsDomain: BpsDomain | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    setProvinceId(bpsDomain?.id || "");
    newParams.set("province", bpsDomain?.nama.toLowerCase() || "");
    newParams.set("page", "1");
    router.replace(`/properties?${newParams.toString()}`);
  };

  const onRegencyChange = (bpsDomain: BpsDomain | undefined) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("regency", bpsDomain?.nama?.toLowerCase() || "");
    newParams.set("page", "1");
    router.replace(`/properties?${newParams.toString()}`);
  };

  const onSoldStatusChange = (soldStatus: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sold_status", soldStatus);
    newParams.set("page", "1");
    router.replace(`/properties?${newParams.toString()}`);
  };
  const onDeveloperIdChange = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("developer_id", id === "0" ? "" : id);
    newParams.set("page", "1");
    router.replace(`/properties?${newParams.toString()}`);
  };
  const onBankIdChange = (id: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("bank_id", id === "0" ? "" : id);
    newParams.set("page", "1");
    router.replace(`/properties?${newParams.toString()}`);
  };

  const isAdmin = agent.data?.role === AgentRole.Admin;
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <SearchFilter searchParams={searchParams} />
        <div
          className={cn(
            "hidden md:grid gap-2",
            isAdmin ? "grid-cols-5" : "grid-cols-3",
          )}
        >
          <ProvinceSelect
            isFilter
            onProvinceChange={onProvinceChange}
            defaultValue={searchParams.province}
          />
          <ProvinceRegencySelect
            isFilter
            provinceId={provinceId}
            onValueChange={onRegencyChange}
            defaultValue={searchParams.regency}
          />
          <SoldFilter
            onValueChange={onSoldStatusChange}
            defaultValue={searchParams.sold_status}
          />
          {isAdmin && (
            <>
              <DeveloperFilter
                onValueChange={onDeveloperIdChange}
                defaultValue={searchParams.developer_id ?? "0"}
              />
              <BankFilter
                onValueChange={onBankIdChange}
                defaultValue={searchParams.bank_id ?? "0"}
              />
            </>
          )}
        </div>
      </div>
      <Link
        href="/properties/new"
        className={cn(buttonVariants({}))}
        data-tooltip-id="add-new-property"
        data-tooltip-content="Add new property"
      >
        <LuCirclePlus />
        <div className="flex items-center gap-1">
          <span className="hidden md:block">Add</span>
          Property
        </div>
      </Link>
      <Tooltip id="add-new-property" />
    </div>
  );
};
