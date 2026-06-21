import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ_ONE = [
  {
    question: "Apa saja layanan yang disediakan oleh PrimePro Indonesia ?",
    answer:
      "PrimePro Indonesia membantu pemasaran dalam penjualan dan penyewaan seluruh jenis properti. ",
  },
  {
    question: "Bagaimana cara menitipkan properti melalui PrimePro Indonesia ?",
    answer:
      "Bapak/Ibu dapat langsung menghubungi kami di nomor WA 0821 1616 2995",
  },
  {
    question:
      "Apakah kami dapat mendapatkan informasi tentang harga pasaran properti dari agen PrimePro Indonesia?",
    answer:
      "Bapak/Ibu dapat langsung menghubungi kami di nomor WA 0821 1616 2995 untuk diarahkan ke marketing spesialis area dimana properti dipasarkan.",
  },
  {
    question:
      "Apa saja manfaat menitipkan properti ke agen PrimePro Indonesia ?",
    answer: (
      <ul className="ml-6 list-disc [&>li]:mt-2">
        <li>Properti dipasarkan melalui beberapa platform </li>
        <li> Properti memiliki exposure tinggi ke para calon pembeli.</li>
        <li>Properti akan dianalisa market valuenya oleh agen PrimePro.</li>
      </ul>
    ),
  },
  {
    question:
      "Apakah PrimePro Indonesia membantu dalam proses negosiasi harga ?",
    answer:
      "Betul, agen kami akan membantu proses negosiasi sampai mendapatkan harga terbaik.",
  },
  {
    question:
      "Apakah ada biaya untuk memasarkan properti di PrimePro Indonesia?",
    answer:
      "Kami tidak memungut biaya pemasaran tetapi ada biaya success fee yang harus dibayarkan oleh pemilik apabila properti terjual dengan agen kami.",
  },
];

const FaqOne = () => {
  return (
    <div className="flex flex-col ">
      <p className="text-muted-foreground">
        A. Informasi Titip Jual &amp; Sewa Di Primepro Indonesia
      </p>
      <Accordion className="w-full">
        {FAQ_ONE.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left gap-4 tracking-tight ">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-7">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const FAQ_TWO = [
  {
    question:
      "Apa saja jenis property yang ditawarkan oleh Primepro Indonesia ?",
    answer:
      "Tanah, rumah tinggal, apartemen, ruko, office space, pabrik, gedung dan lainnya.",
  },
  {
    question:
      "Bagaimana cara membeli atau menyewa properti di PrimePro Indonesia ?",
    answer:
      "Bapak/Ibu dapat langsung menghubungi kami di nomor WA 0821 1616 2995 ",
  },
  {
    question: "Apakah properti yang dipasarkan PrimePro sudah legal?",
    answer:
      "Agen kami melakukan pengecekkan legalitas terlebih dahulu sebelum memasarkan properti tersebut di platform kami.",
  },
  {
    question:
      "Apakah PrimePro Indonesia dapat membantu pelanggan mengurus KPR?",
    answer:
      "Perusahaan kami sudah bekerjasama dengan berbagai bank. Kami akan bantu proses KPR sampai selesai akad kredit di bank.",
  },
];

const FaqTwo = () => {
  return (
    <div className="flex flex-col ">
      <p className="text-muted-foreground">
        B. Informasi cari beli dan sewa Properti
      </p>
      <Accordion className="w-full">
        {FAQ_TWO.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left gap-4 tracking-tight">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-7">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const FAQ_THREE = [
  {
    question: "Jam berapa kantor PrimePro Indonesia beroperasional?",
    answer: (
      <>
        <p>Senin – Jumat jam 09.00 – 17.00</p>
        <p>Sabtu jam 09.00 – 13.00</p>
      </>
    ),
  },
  {
    question: "Bagaimana cara menghubungi PrimePro Indonesia?",
    answer:
      "Bapak/Ibu dapat langsung menghubungi kami di nomor WA 0821 1616 2995 ",
  },
  {
    question: "Apakah dapat datang langsung ke kantor PrimePro Indonesia?",
    answer:
      "Lokasi kantor kami di Kemang Icon, Jl. Kemang Raya No. 1, Jakarta Selatan",
  },
  {
    question:
      "Bagaimana jika saya ingin bergabung menjadi agen property di PrimePro Indonesia?",
    answer:
      "Bapak/Ibu dapat langsung menghubungi kami di nomor WA 0821 1616 2995 ",
  },
];

const FaqThree = () => {
  return (
    <div className="flex flex-col ">
      <p className="text-muted-foreground">
        C. Informasi tentang PrimePro Indonesia
      </p>
      <Accordion className="w-full">
        {FAQ_THREE.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left gap-4 tracking-tight">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-7">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const FaqPrimePro = () => {
  return (
    <div className="flex flex-col gap-8">
      <FaqOne />
      <FaqTwo />
      <FaqThree />
    </div>
  );
};
