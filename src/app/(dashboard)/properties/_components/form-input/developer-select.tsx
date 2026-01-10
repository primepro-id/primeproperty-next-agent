import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { findManyDevelopersOptions } from "@/hooks/developers";
import { useQuery } from "@tanstack/react-query";

type DeveloperSelectProps = {
  defaultValue?: string;
};

export const DeveloperSelect = ({ defaultValue }: DeveloperSelectProps) => {
  const { data } = useQuery(findManyDevelopersOptions());
  return (
    <div className="grid gap-2">
      <Label htmlFor="developer_id">Developer</Label>
      <Select name="developer_id" defaultValue={defaultValue}>
        <SelectTrigger className="capitalize">
          <SelectValue placeholder="Pilih Developer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"0"} className="capitalize">
            Tidak ada
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
    </div>
  );
};
