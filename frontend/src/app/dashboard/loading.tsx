"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "motion/react"

export default function DashboardLoading() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center space-y-4">
                                    <Skeleton className="h-32 w-32 rounded-full" />
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-4 w-24" />

                                    <div className="w-full pt-4 border-t border-border">
                                        <Skeleton className="h-10 w-full rounded-md" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex-1">
                        <div className="mb-6">
                            <Skeleton className="h-8 w-48 mb-4" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Card key={i}>
                                        <CardHeader className="pb-2">
                                            <Skeleton className="h-5 w-32" />
                                        </CardHeader>
                                        <CardContent>
                                            <Skeleton className="h-8 w-16 mb-2" />
                                            <Skeleton className="h-3 w-24" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                            <Skeleton className="h-7 w-40 mb-4" />

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <Skeleton className="h-40 w-full" />
                                        <CardContent className="p-4">
                                            <Skeleton className="h-5 w-full mb-2" />
                                            <Skeleton className="h-4 w-2/3 mb-2" />
                                            <div className="flex space-x-2 mt-3">
                                                <Skeleton className="h-6 w-16 rounded-full" />
                                                <Skeleton className="h-6 w-16 rounded-full" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="flex justify-center mt-6">
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
