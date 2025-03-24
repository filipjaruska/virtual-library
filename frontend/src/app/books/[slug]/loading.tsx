"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"
import { Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BookLoadingPage() {
    return (
        <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto py-8 px-4 md:px-8 max-w-6xl">
                <div className="bg-card shadow-md rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 w-full flex items-center justify-center p-4 md:p-6">
                            <div className="relative w-full max-w-[300px] aspect-[2/3] overflow-clip rounded-md shadow-lg">
                                <Skeleton className="absolute inset-0" />
                            </div>
                        </div>

                        <div className="md:w-2/3 w-full p-4 md:p-6 lg:p-8 flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div className="w-full md:w-3/4">
                                    <Skeleton className="h-10 w-4/5 mb-2" />
                                    <Skeleton className="h-6 w-2/3" />
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <button className="rounded-full p-3 bg-muted opacity-50">
                                        <Heart className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4 flex flex-wrap gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Badge key={i} variant={i === 0 ? "primary" : "default"} className="opacity-50">
                                        <Skeleton className="h-4 w-16" />
                                    </Badge>
                                ))}
                            </div>

                            <div className="prose prose-sm md:prose-base text-card-foreground mb-6">
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-5/6 mb-2" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>

                            <div className="mt-auto pt-4 border-t border-border">
                                <div className="flex flex-wrap gap-3">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <Skeleton key={i} className="h-8 w-32 rounded-md" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-card border border-border rounded-lg shadow-lg p-6 gap-4 mb-8">
                        <Skeleton className="h-8 w-48 mb-4" />
                        <Skeleton className="h-28 w-full mb-4 rounded-lg" />
                        <Skeleton className="h-10 w-24" />
                    </div>

                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-card p-4 rounded-lg shadow-sm">
                                <Skeleton className="h-4 w-48 mb-2" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}