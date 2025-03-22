"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react"
import { addToFavorites, isBookFavorited, removeFromFavorites } from "@/lib/actions/favorite-actions";

interface FavoriteButtonProps {
    bookId: number;
}

export function FavoriteButton({ bookId }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkFavoriteStatus() {
            try {
                const result = await isBookFavorited(bookId);
                if (result.ok) {
                    setIsFavorited(result.isFavorited);
                }
            } finally {
                setIsLoading(false);
            }
        }

        checkFavoriteStatus();
    }, [bookId]);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);

        try {
            const action = isFavorited ? removeFromFavorites : addToFavorites;
            const result = await action(bookId);

            if (result.ok) {
                setIsFavorited(!isFavorited);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleToggleFavorite}
            variant={isFavorited ? "default" : "outline"}
            size="icon"
            disabled={isLoading}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className="relative overflow-hidden"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isFavorited ? "favorited" : "unfavorited"}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{
                        scale: isFavorited ? [1, 1.2, 1] : 1,
                        opacity: 1
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        scale: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                >
                    <Heart className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`} />
                </motion.div>
            </AnimatePresence>

            {isFavorited && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        style={{
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            backgroundColor: 'hsl(var(--primary))'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 0.2,
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 2,
                            repeatDelay: 0.5
                        }}
                    />
                </div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <motion.div
                        style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '9999px',
                            backgroundColor: 'hsl(var(--primary))'
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1
                        }}
                    />
                </div>
            )}
        </Button>
    );
}