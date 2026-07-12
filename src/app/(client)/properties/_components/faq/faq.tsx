"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqPrimePro } from "./faq-primepro";
import { FaqProperty } from "./faq-property";
import { FaqSchema } from "./faq-schema";

type FaqProps = {
  defaultTab: "PRIMEPRO" | "PROPERTY";
};

export const Faq = ({ defaultTab }: FaqProps) => {
  return (
    <>
      <FaqSchema />
      <section className="flex flex-col max-w-2xl gap-4 my-4" id="faq">
        <Tabs defaultValue={defaultTab} className="max-w-2xl">
          <TabsList className="rounded">
            <TabsTrigger
              value="PRIMEPRO"
              className="data-[state=active]:font-bold font-sans"
            >
              FAQ UMUM
            </TabsTrigger>
            <TabsTrigger
              value="PROPERTY"
              className="data-[state=active]:font-bold font-sans"
            >
              FAQ PROPERTI
            </TabsTrigger>
          </TabsList>
          <TabsContent value="PRIMEPRO">
            <FaqPrimePro />
          </TabsContent>
          <TabsContent value="PROPERTY">
            <FaqProperty />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};
