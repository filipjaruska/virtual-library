import { getStrapiMedia } from "@/lib/utils";

interface StrapiImageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
    className?: string;
    style?: React.CSSProperties;
}

export function StrapiImage({
    src,
    alt,
    height,
    width,
    className,
    style,
}: Readonly<StrapiImageProps>) {
    if (!src) return null;
    const imageUrl = getStrapiMedia(src);
    const imageFallback = `https://placehold.co/${width}x${height}`;

    return (
        <img
            src={imageUrl ?? imageFallback}
            alt={alt}
            height={height}
            width={width}
            className={className}
            style={style}
            decoding="async"
            loading="lazy"
        />
    );
}