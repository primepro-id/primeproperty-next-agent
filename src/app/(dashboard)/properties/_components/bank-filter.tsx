import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findManyBanksOptions } from "@/hooks/banks";
import { findManyDevelopersOptions } from "@/hooks/developers";
import { useQuery } from "@tanstack/react-query";

type BankFilterProps = {
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

export const BankFilter = ({
  defaultValue,
  onValueChange,
}: BankFilterProps) => {
  const { data } = useQuery(findManyBanksOptions());
  return (
    <Select
      name="bank_id"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="capitalize">
        <SelectValue placeholder="Semua Bank" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"0"} className="capitalize">
          Semua Bank
        </SelectItem>
        {Array.isArray(data?.data?.data) &&
          data?.data?.data?.map((bank, index) => {
            return (
              <SelectItem
                key={`${index}_${bank.id}`}
                value={String(bank.id)}
                className="capitalize"
              >
                {bank.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};
