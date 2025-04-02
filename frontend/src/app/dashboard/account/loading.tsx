"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"

export default function AccountLoadingPage() {
    return (
        <div className="container max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8" >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                            <div className="p-6">
                                <Skeleton className="h-6 w-40 mb-4" />
                                <div className="space-y-4">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className="space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ))}
                                    <Skeleton className="h-10 w-24 mt-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                            <div className="p-6">
                                <Skeleton className="h-6 w-32 mb-4" />
                                <div className="flex flex-col items-center space-y-4">
                                    <Skeleton className="h-32 w-32 rounded-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
