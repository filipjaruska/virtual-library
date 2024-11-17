import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
    className?: string;
}

export function StrapiImage({
    src,
    alt,
    height,
    width,
    className,
}: Readonly<StrapiImageProps>) {
    if (!src) return null;
    const imageUrl = getStrapiMedia(src);
    console.log("Image URL in strapi-image.tsx: ", imageUrl);
    const imageFallback = `https://placehold.co/${width}x${height}`;

    return (
        <img
            src={imageUrl ?? imageFallback}
            alt={alt}
            height={height}
            width={width}
            className={className}
        />
    );
}