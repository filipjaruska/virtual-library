"use client"
import { getStrapiMedia } from "@/lib/utils"
import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "motion/react"

interface StrapiImageProps {
    src: string
    alt: string
    height: number
    width: number
    className?: string
    style?: React.CSSProperties
    priority?: boolean
    enableAnimation?: boolean
    hoverEffect?: "none" | "zoom" | "lift" | "brighten"
}

export function StrapiImage({
    src,
    alt,
    height,
    width,
    className = "",
    style,
    priority = false,
    enableAnimation = true,
    hoverEffect = "none",
}: Readonly<StrapiImageProps>) {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const imageFallback = `https://placehold.co/${width}x${height}`
    const imageUrl = src ? getStrapiMedia(src) : null
    const finalSrc = !src || hasError ? imageFallback : (imageUrl ?? imageFallback)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const hoverAnimations = {
        none: {},
        zoom: { scale: 1.05 },
        lift: { y: -5 },
        brighten: { filter: "brightness(1.1)" },
    }

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    const handleImageError = () => {
        setHasError(true)
        setIsLoading(false)
    }

    if (!enableAnimation) {
        return (
            <img
                src={finalSrc || imageFallback}
                alt={alt}
                height={height}
                width={width}
                className={className}
                style={style}
                decoding="async"
                loading={priority ? "eager" : "lazy"}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
        )
    }

    return (
        <div className="relative" style={{ height: "auto", width: "auto", ...style }}>
            {isLoading && <div className="absolute inset-0 bg-muted/30 animate-pulse rounded-sm" style={{ height, width }} />}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible && !isLoading ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                whileHover={hoverEffect !== "none" ? hoverAnimations[hoverEffect] : undefined}
            >
                <img
                    src={finalSrc}
                    alt={alt}
                    height={height}
                    width={width}
                    className={className}
                    style={{ opacity: isLoading ? 0 : 1 }}
                    decoding="async"
                    loading={priority ? "eager" : "lazy"}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                />
            </motion.div>
        </div>
    )
}

