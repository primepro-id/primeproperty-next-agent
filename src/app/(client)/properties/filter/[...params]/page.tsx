import { Suspense } from "react";
import { Properties } from "../../_components";
import { parseFilterParams } from "../../_lib/parse-filter-params";
import { Metadata } from "next";
import { generatePropertiesFilterMetadata } from "../../_lib/create-properties-filter-metadata";

type PageProps = {
  params: Promise<{ params: string[] }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => generatePropertiesFilterMetadata(params);

export default async function Page({ params }: PageProps) {
  const pageParams = await params;

  return (
    <Suspense>
      <Properties searchParams={parseFilterParams(pageParams.params)} />
    </Suspense>
  );
}
