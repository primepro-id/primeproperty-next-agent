import {
  findProperties,
  FindPropertyQuery,
} from "@/lib/api/properties/find-properties";
import { PropertyList } from "./list";
import { Pagination } from "./pagination";
import { PropertiesFilter } from "./fillters/properties-filter";
import { PropertiesTitle } from "./title";
import { PropertyNotFound } from "./not-found";
import { Faq } from "./faq";
import { createPropertiesSchema } from "@/lib/schema/create-properties-schema";

type PropertiesProps = {
  searchParams: FindPropertyQuery;
};

export const Properties = async ({ searchParams }: PropertiesProps) => {
  const properties = await findProperties({
    limit: String(30),
    ...searchParams,
  });
  if (!properties.data?.data) {
    return <PropertyNotFound searchParams={searchParams} />;
  }

  const jsonLd = createPropertiesSchema(properties?.data.data, searchParams);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PropertiesFilter searchParams={searchParams} />
      <div className="container mx-auto flex flex-col gap-4 py-4 px-2">
        <div className="flex items-center justify-between">
          <PropertiesTitle
            propertyCount={properties.data.total_data}
            searchParams={searchParams}
          />
          <div className="hidden lg:flex">
            <Pagination
              searchParams={searchParams}
              currentPage={searchParams.page ? +searchParams.page : 1}
              totalPages={properties.data.total_pages}
            />
          </div>
        </div>
        <PropertyList
          searchParams={searchParams}
          propertiesWithAgent={properties.data?.data}
        />
        <div className="mt-4">
          <Pagination
            searchParams={searchParams}
            currentPage={searchParams.page ? +searchParams.page : 1}
            totalPages={properties.data.total_pages}
          />
        </div>

        <Faq defaultTab="PROPERTY" />
      </div>
    </>
  );
};
