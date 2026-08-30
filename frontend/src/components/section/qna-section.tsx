import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { QnaBlock } from "@/lib/types/site";

export default function QnaSection({ data }: { readonly data: QnaBlock }) {
  const { title, qnas } = data;

  return (
    <section className="container mx-auto px-4 pb-20 md:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {qnas.map((qna) => (
            <AccordionItem key={qna.id} value={String(qna.id)}>
              <AccordionTrigger className="text-left">{qna.heading}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {qna.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
