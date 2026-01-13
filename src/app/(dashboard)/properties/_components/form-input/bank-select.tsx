import { Label } from "@/components/ui/label";
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

type BankSelectProps = {
  defaultValue?: string;
};

export const BankSelect = ({ defaultValue }: BankSelectProps) => {
  const { data } = useQuery(findManyBanksOptions());
  return (
    <div className="grid gap-2">
      <Label htmlFor="bank_id">Bank</Label>
      <Select name="bank_id" defaultValue={defaultValue}>
        <SelectTrigger className="capitalize">
          <SelectValue placeholder="Pilih bank" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"0"} className="capitalize">
            Tidak ada
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
    </div>
  );
};
