import { FindPropertyQuery } from "@/lib/api/properties/find-properties";
import { PropertiesTable, PropertyFilter } from "./_components";

export const revalidate = 0;
type PropertiesPageProps = {
  searchParams: Promise<FindPropertyQuery>;
};
const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const query = await searchParams;
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <PropertyFilter searchParams={query} />
      <PropertiesTable searchParams={query} />
    </div>
  );
};

export default PropertiesPage;
