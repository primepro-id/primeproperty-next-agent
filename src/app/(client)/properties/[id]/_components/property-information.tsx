import { Property } from "@/lib/api/properties/type";
import { buildingConditionToIndonesian } from "@/lib/enums/building-condition";
import { FURNITURE_CAPACITY_LABELS } from "@/lib/enums/furniture-capacity";

type PropertyInformationProps = {
  property: Property;
};
export const PropertyInformation = ({ property }: PropertyInformationProps) => {
  return (
    <div className="mb-4">
      <p className="text-base font-semibold">Informasi Properti</p>

      <div className="grid  gap-2 text-sm md:text-base  md:grid-cols-2  divide-y md:divide-y-0">
        <span className="grid gap-2 divide-y [&>div]:pt-3 md:divide-y-0">
          <div className="flex items-center gap-1 ">
            <p className="w-32 text-muted-foreground">Tipe</p>
            <p className="capitalize font-bold">{property.building_type}</p>
          </div>
          <div className="flex items-center gap-1 ">
            <p className="w-32 text-muted-foreground">Sertifikat</p>
            <p>{property.building_certificate.toUpperCase()}</p>
          </div>

          <div className="flex items-center gap-1 ">
            <p className="w-32 text-muted-foreground">Kondisi</p>
            <p className="capitalize">
              {buildingConditionToIndonesian(property.building_condition)}
            </p>
          </div>
          <div className="flex items-center gap-1 ">
            <p className="w-32 text-muted-foreground">Luas Tanah</p>
            <p>{property.measurements.land_area} m²</p>
          </div>
          <div className="flex items-center gap-1 ">
            <p className="w-32 text-muted-foreground">Luas Bangunan</p>
            <p>{property.measurements.building_area} m²</p>
          </div>

          {property.measurements.building_level > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Tinggi Bangunan</p>
              <p>{property.measurements.building_level} lantai</p>
            </div>
          )}
        </span>
        <span className="grid gap-2 divide-y [&>div]:pt-3 md:divide-y-0">
          {property.specifications.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Kamar Tidur</p>
              <p>{property.specifications.bedrooms}</p>
            </div>
          )}
          {property.specifications.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Kamar Mandi</p>
              <p>{property.specifications.bathrooms}</p>
            </div>
          )}
          {property.specifications.garage > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Garasi</p>
              <p>{property.specifications.garage} Mobil</p>
            </div>
          )}
          {property.specifications.carport > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Carport</p>
              <p>{property.specifications.carport} Mobil</p>
            </div>
          )}
          {property.specifications.electrical_power > 0 && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Daya Listrik</p>
              <p>
                {property.specifications.electrical_power.toLocaleString(
                  "id-ID",
                )}{" "}
                Watt
              </p>
            </div>
          )}
          {property.building_furniture_capacity && (
            <div className="flex items-center gap-1">
              <p className="w-32 text-muted-foreground">Perabotan</p>
              <p>
                {
                  FURNITURE_CAPACITY_LABELS[
                    property.building_furniture_capacity
                  ]
                }
              </p>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
