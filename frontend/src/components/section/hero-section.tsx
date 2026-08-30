import Link from "next/link";
import type { HeroBlock } from "@/lib/types/site";

export function HeroSection({ data }: { readonly data: HeroBlock }) {
  const { heading, subHeading, link } = data;

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Backdrop is drawn rather than loaded, so the page pulls no external assets. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/25 via-background to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] dark:opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 3px, transparent 3px, transparent 11px, hsl(var(--foreground)) 11px, hsl(var(--foreground)) 13px, transparent 13px, transparent 26px)",
          maskImage: "linear-gradient(to top, black, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[420px] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground md:text-xl">{subHeading}</p>
        <Link
          href={link.url}
          className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          {link.text}
        </Link>
      </div>
    </section>
  );
}
