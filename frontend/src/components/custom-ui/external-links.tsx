import { ExternalLink } from "lucide-react";
import type { BookLink } from "@/lib/types/books";

export function ExternalLinks({ links }: { links: BookLink[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {link.text}
        </a>
      ))}
    </div>
  );
}
