import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";

export const PropertyComparisonSelect = ({
  selectedId,
  properties,
  onValueChange,
}: {
  selectedId: string;
  properties?: PropertyWithAgent[];
  onValueChange: (val: string) => void;
}) => {
  return (
    <Select defaultValue={selectedId} onValueChange={onValueChange}>
      <SelectTrigger className="w-96">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {properties?.map((p) => (
          <SelectItem key={p[0].id} value={String(p[0].id)}>
            {p[0].id}. {p[0].title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
