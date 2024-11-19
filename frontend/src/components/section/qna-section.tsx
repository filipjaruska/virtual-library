import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface QnaProps {
    id: number;
    heading: string;
    answer: string;
}

interface QnaSectionProps {
    id: number;
    __component: string;
    title: string;
    qnas: QnaProps[],
}

export default function QnaSection({ data }: { readonly data: QnaSectionProps }) {
    const { title, qnas } = data;
    return (
        <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
            <Accordion type="single" collapsible className="w-full md:w-1/2 mx-auto">
                <div className="text-2xl font-semibold">{title}</div>
                {qnas.map((qna) => (
                    <AccordionItem key={qna.id} value={String(qna.id)}>
                        <AccordionTrigger>{qna.heading}</AccordionTrigger>
                        <AccordionContent>
                            {qna.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}