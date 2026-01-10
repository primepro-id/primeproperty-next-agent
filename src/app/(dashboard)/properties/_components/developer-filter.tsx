import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findManyDevelopersOptions } from "@/hooks/developers";
import { useQuery } from "@tanstack/react-query";

type DeveloperFilterProps = {
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

export const DeveloperFilter = ({
  defaultValue,
  onValueChange,
}: DeveloperFilterProps) => {
  const { data } = useQuery(findManyDevelopersOptions());
  return (
    <Select
      name="developer_id"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="capitalize">
        <SelectValue placeholder="Semua Developer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"0"} className="capitalize">
          Semua Developer
        </SelectItem>
        {Array.isArray(data?.data?.data) &&
          data?.data?.data?.map((dev, index) => {
            return (
              <SelectItem
                key={`${index}_${dev.id}`}
                value={String(dev.id)}
                className="capitalize"
              >
                {dev.name}
              </SelectItem>
            );
          })}
      </SelectContent>
    </Select>
  );
};
