import Link from "next/link";
import { Image as ImageType } from "@/lib/types/image";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";



interface LinkProps {
    id: number;
    url: string;
    text: string;
}

interface HeroSectionProps {
    data: {
        id: number;
        __component: string;
        heading: string;
        subHeading: string;
        image: ImageType;
        link: LinkProps;
    }
}

export function HeroSection({ data }: Readonly<HeroSectionProps>) {
    const { heading, subHeading, image, link } = data;
    return (
        <header className="relative h-[600px] overflow-hidden">
            <Image
                alt="Background"
                className="absolute inset-0 object-cover w-full h-full"
                height={1080}
                src={getStrapiMedia(image.url) || "https://placehold.co/1920x1080"}
                width={1920}
                style={{ userSelect: "none" }}
            />
            <div
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                    {heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                    {subHeading}
                </p>
                <Link
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-background rounded-md shadow hover:bg-secondary"
                    href={link.url}
                >
                    {link.text}
                </Link>
            </div>
        </header>
    );
}