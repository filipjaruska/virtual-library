import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import type { GlobalData } from "@/lib/types/site";
import { HeaderNav } from "@/components/custom-ui/header-nav";

export function Header({ data }: { data: GlobalData["header"] }) {
  const { logoText, ctaButton } = data;

  return (
    <header className="flex items-center justify-between gap-4 bg-secondary px-4 py-3 text-secondary-foreground shadow-md">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <SiBookstack className="h-8 w-8 shrink-0" />
          <span className="font-mono text-xl font-bold sm:text-2xl">{logoText.text}</span>
        </Link>
        <HeaderNav />
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href={ctaButton.url}>{ctaButton.text}</Link>
        </Button>
      </div>
    </header>
  );
}
