import { WatermarkImage } from "@/components/custom-ui/watermark-image";
import { Button } from "@/components/ui/button";
import { PropertyWithAgent } from "@/lib/api/properties/find-properties";
import { env } from "@/lib/env";
import { LuCircle, LuDelete } from "react-icons/lu";
import { Specifications } from "../../_components/specifications";
import { bookmarkProperty } from "../../_lib/bookmark-property";

type BookmarkedPropertyTableProps = {
  properties?: PropertyWithAgent[] | null;
  onRemoveClick: () => void;
};

export const BookmarkedPropertyTable = ({
  properties,
  onRemoveClick,
}: BookmarkedPropertyTableProps) => {
  const baseImgPath = env.NEXT_PUBLIC_S3_ENDPOINT;
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]  w-full">
      {properties?.map((p) => {
        const coverImage =
          p[0].images.find((img) => img.is_cover) ?? p[0].images[0];
        return (
          <div
            key={p[0].id}
            className="rounded shadow flex flex-col gap-2 relative"
          >
            <WatermarkImage
              watermarkProps={{ fontSize: 20 }}
              imageProps={{
                src: baseImgPath + coverImage.path,
                alt: p[0].title,
                width: 1024,
                height: 1024,
                className: "w-full h-48 rounded object-cover aspect-square",
              }}
            />
            <div className="bg-primary text-primary-foreground px-2 py-1 text-xs rounded absolute top-1 right-1 dark:font-semibold uppercase z-10">
              {p[0].building_type}
            </div>
            <div className="p-2 flex flex-col gap-2">
              <span className="flex flex-col gap-1">
                <div className="font-semibold text-lg">{p[0].title}</div>
                <p className="line-clamp-1 text-muted-foreground">
                  {p[0].description}
                </p>
                <Specifications propertyWithAgent={p} />
              </span>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => {
                    bookmarkProperty(p[0].id);
                    onRemoveClick();
                  }}
                >
                  <LuDelete />
                  REMOVE
                </Button>
                <Button variant="outline" className="w-fit ml-auto">
                  <LuCircle />
                  COMPARE
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
