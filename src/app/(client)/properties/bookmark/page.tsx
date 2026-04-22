import { BookmarkedProperties } from "./_components/bookmarked-properties";

export default function Page() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold">Saved Properties</h1>
        <h3 className="text-muted-foreground">
          Your saved properties to compare
        </h3>
      </div>

      <BookmarkedProperties />
    </div>
  );
}
