import { Faq } from "../_components/faq";
import { BookmarkedProperties } from "./_components/bookmarked-properties";

export default function Page() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold">Perbandingan Properti</h1>
        <h3 className="text-muted-foreground">
          Pilih 2 properti, klik &quot;COMPARE&quot;, lalu klik
          &quot;LANJUTKAN&quot; untuk penelusuran
        </h3>
      </div>

      <BookmarkedProperties />

      <Faq defaultTab="PROPERTY" />
    </div>
  );
}
