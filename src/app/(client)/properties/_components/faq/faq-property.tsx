import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ_PROPERTY = [
  {
    question: "Pajak apa saja yang dikenakan saat membeli sebuah rumah?",
    answer:
      "Ada beberapa biaya yang perlu diperhatikan yaitu: pajak pembeli, biaya notaris dan biaya balik nama.",
  },
  {
    question:
      "Dokumen apa saja yang dibutuhkan untuk melakukan transaksi jual beli properti?",
    answer:
      "Kelengkapan dokumen legalitas menentukan kelancaran sebuah transaksi properti, apabila masih ada dokumen yang tidak lengkap maka notaris perlu menyelesaikan satu per satu masalah ini.",
  },
  {
    question: "Apakah harga properti masih bisa dinegosiasikan?",
    answer:
      "Harga properti yang terpampang di iklan kebanyakan merupakan harga buka, calon pembeli dapat memberikan penawaran harga yang mereka harapkan.",
  },
  {
    question:
      "Berapa lama proses balik nama sertifikat biasanya memakan waktu?",
    answer:
      "Proses balik nama sertifikat itu sekitar 2-3 bulan tergantung kebijakan dari pemerintah setempat.",
  },
  {
    question: "Apakah harga sudah termasuk biaya notaris dan balik nama?",
    answer:
      "Tidak, harga tersebut tidak termasuk biaya notaris dan balik nama.",
  },
  {
    question:
      "Bagaimana cara memastikan legalitas dan keaslian sertifikat properti?",
    answer:
      "Pihak notaris akan memastikan keaslian dari seluruh dokumen legalitas pemilik sebelum melakukan transaksi jual beli.",
  },
  {
    question:
      "Apakah pembelian properti dapat dilakukan menggunakan mata uang dolar?",
    answer:
      "Untuk saat ini, transaksi jual beli hanya dengan mata uang rupiah.",
  },
  {
    question: "Jika membeli dengan sistem KPR, apa saja syarat dan tahapannya?",
    answer:
      "Pembelian properti dengan sistem KPR akan dibantu sepenuhnya oleh agen PrimePro dan tim bank.",
  },
  {
    question:
      "Apakah bisa melakukan survei langsung ke lokasi sebelum memutuskan membeli atau menyewa?",
    answer:
      "Bisa, proses survey merupakan tahapan yang harus dilakukan oleh calon pembeli sebelum mengambil keputusan untuk membeli suatu properti.",
  },
  {
    question:
      "Untuk sewa, apakah ada uang jaminan (deposit) dan bagaimana ketentuannya?",
    answer:
      "Pada transaksi sewa menyewa, pastinya akan ada biaya security deposit (uang jaminan) yang dipegang oleh pemilik tetapi nominalnya nanti akan disepakati bersama antara pemilik dan penyewa properti.",
  },
  {
    question: "Berapa lama minimal masa sewa, dan apakah bisa diperpanjang?",
    answer: "Minimum jangka waktu sewa 6 bulan.",
  },
  {
    question:
      "Siapa yang bertanggung jawab atas biaya perawatan atau perbaikan selama masa sewa?",
    answer:
      "Biaya perawatan dan perbaikan merupakan tanggung jawab dari pemilik dan penyewa tergantung kesepakatan sewa di awal, agen PrimePro akan membantu sampai tuntas.",
  },
  {
    question:
      "Apakah pembeli akan mendapatkan bantuan dalam proses pengurusan KPR atau dokumen legal?",
    answer:
      "Ya, kami akan bantu pengurusan KPR dan pengurusan dokumen legal dengan menyarankan tim bank dan notaris yang berpengalaman sehingga transaksi akan berjalan dengan nyaman dan aman.",
  },
  {
    question:
      "Bagaimana cara mengetahui estimasi biaya tambahan selain harga jual atau sewa properti?",
    answer:
      "Agen PrimePro akan memberikan rincian biaya yang perlu dibayarkan oleh pembeli ataupun penyewa. ",
  },
  {
    question:
      "Apakah saya akan mendapatkan pendampingan dari agen Prime Pro selama proses pembelian properti?",
    answer:
      "Ya, kami agen PrimePro akan mendampingi dan membantu proses pembelian properti anda sampai beres semua. ",
  },
  {
    question:
      "Apakah notaris yang digunakan berasal dari pihak saya sendiri atau ditentukan oleh Prime Pro?",
    answer:
      "Walaupun agen PrimePro memiliki banyak rekanan notaris tetapi untuk notaris nanti akan disepakati oleh pemilik dan pembeli pada saat transaksi properti. ",
  },
];

export const FaqProperty = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQ_PROPERTY.map((faq, index) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger className="text-left gap-4 tracking-tight">
            {index + 1} {faq.question}
          </AccordionTrigger>
          <AccordionContent className="leading-7">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
