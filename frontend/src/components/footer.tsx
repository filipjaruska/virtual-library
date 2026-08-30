import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import type { GlobalData } from "@/lib/types/site";

function socialIcon(url: string) {
  if (url.includes("github")) return <FaGithub className="h-5 w-5" />;
  if (url.includes("twitter") || url.includes("x.com")) return <FaTwitter className="h-5 w-5" />;
  if (url.includes("instagram")) return <FaInstagram className="h-5 w-5" />;
  return null;
}

export function Footer({ data }: { data: GlobalData["footer"] }) {
  const { logoText, socialLink, text } = data;

  return (
    <footer className="bg-secondary py-8 text-secondary-foreground">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 md:flex-row md:justify-between md:px-6">
        <span className="font-mono font-semibold">{logoText.text}</span>

        <p className="max-w-md text-center text-sm text-muted-foreground md:text-left">
          {text}
        </p>

        <div className="flex items-center gap-4">
          {socialLink.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {socialIcon(link.url)}
              <span className="sr-only">{link.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
