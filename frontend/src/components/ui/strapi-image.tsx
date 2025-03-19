'use client';
import { getStrapiMedia } from "@/lib/utils";
import { useState } from "react";

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
    const [hasError, setHasError] = useState(false);

    const imageFallback = `https://placehold.co/${width}x${height}`;
    const imageUrl = src ? getStrapiMedia(src) : null;

    const finalSrc = (!src || hasError) ? imageFallback : (imageUrl ?? imageFallback);

    return (
        <img
            src={finalSrc}
            alt={alt}
            height={height}
            width={width}
            className={className}
            style={style}
            decoding="async"
            loading="lazy"
            onError={() => setHasError(true)}
        />
    );
}