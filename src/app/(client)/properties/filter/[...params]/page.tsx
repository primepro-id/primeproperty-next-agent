import { Suspense } from "react";
import { Properties } from "../../_components";
import { parseFilterParams } from "../_lib/parse-filter-params";

type PageProps = {
  params: Promise<{ params: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const pageParams = await params;

  return (
    <Suspense>
      <Properties searchParams={parseFilterParams(pageParams.params)} />
    </Suspense>
  );
}
