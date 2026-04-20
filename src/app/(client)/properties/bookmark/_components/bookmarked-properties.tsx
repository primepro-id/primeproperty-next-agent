"use client";
import { useProperties } from "@/hooks";
import { bookmarkedPropertyOptions } from "@/hooks/local-storage/bookmark";
import { useQuery } from "@tanstack/react-query";
import { EmptyBookmarkedProperties } from "./empty-bookmarked-properties";
import Loading from "@/app/(client)/loading";
import { BookmarkedPropertyTable } from "./bookmarked-property-table";

export const BookmarkedProperties = () => {
  const bookmarkedProperties = useQuery(bookmarkedPropertyOptions());
  const properties = useProperties(
    { ids: bookmarkedProperties.data },
    {
      enabled:
        !!bookmarkedProperties.data && bookmarkedProperties?.data?.length > 0,
    },
  );

  if (bookmarkedProperties.isLoading || properties.isLoading) {
    return <Loading />;
  }

  if (bookmarkedProperties.data?.length === 0) {
    return <EmptyBookmarkedProperties />;
  }

  return (
    <div>
      <BookmarkedPropertyTable
        properties={properties?.data?.data?.data}
        onRemoveClick={() => bookmarkedProperties.refetch()}
      />
    </div>
  );
};
