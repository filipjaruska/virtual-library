"use client";

import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";

export function DemoBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem("demo-banner-dismissed");
        if (!dismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem("demo-banner-dismissed", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-start gap-3 pr-8">
                    <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-sm md:text-base font-medium">
                            <span className="font-bold">Demo Mode:</span> For cost-saving purposes, the Strapi v4 backend has been disabled.
                            This is a <span className="font-semibold">demo version only</span> — most interactive features
                            (comments, favorites, authentication) won't persist. The backend is not hosted and cannot be shown.
                        </p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-white/20 transition-colors"
                        aria-label="Dismiss banner"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
