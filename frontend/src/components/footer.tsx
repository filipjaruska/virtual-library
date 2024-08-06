import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

interface SocialLink {
    id: number;
    text: string;
    url: string;
}

interface FooterProps {
    data: {
        logoText: {
            id: number,
            text: string,
            url: string,
        },
        text: string,
        socialLink: SocialLink[],
    };
}

function selectSocialIcon(url: string) {
    if (url.includes("twitter")) return <FaTwitter className="h-6 w-6" />;
    if (url.includes("github")) return <FaGithub className="h-6 w-6"/>;
    if (url.includes("instagram")) return <FaInstagram className="h-6 w-6"/>;
    return null;
}

export function Footer({ data }: Readonly<FooterProps>) {
    const { logoText, socialLink, text } = data;
    return (
        <div className="bg-secondary text-secondary-foreground py-8">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
                <div>{logoText.text}</div>
                <p className="mt-4 md:mt-0 text-sm text-muted-foreground">{text}</p>
                <div className="flex items-center space-x-4">
                    {socialLink.map((link) =>
                        <Link key={link.id} className="text-secondary-foreground hover:text-muted-foreground" href={link.url}>
                            {selectSocialIcon(link.url)}
                            <span className="sr-only">Visit us at {link.text}</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
