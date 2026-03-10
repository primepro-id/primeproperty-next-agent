import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterSortProps = {
  defaultValue?: string;
  onValueChange: (value: string) => void;
};

export const FilterSort = ({
  defaultValue,
  onValueChange,
}: FilterSortProps) => {
  return (
    <div>
      <Label>Urutkan</Label>
      <Select
        name="order_by"
        defaultValue={defaultValue ?? "Newest"}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="uppercase">
          <SelectValue placeholder="Terbaru" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Newest">TERBARU</SelectItem>
          <SelectItem value="LowestPrice">HARGA TERENDAH</SelectItem>
          <SelectItem value="HighestPrice">HARGA TERTINGGI</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
