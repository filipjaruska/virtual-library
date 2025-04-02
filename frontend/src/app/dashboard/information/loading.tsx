"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "motion/react"

export default function DashboardInformationLoading() {
    return (

        <div className="flex min-h-screen w-full flex-col">

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col sm:gap-4 sm:py-4">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Skeleton className="h-8 w-64 mb-2" />

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-4" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-8 w-16 mb-2" />
                                        <Skeleton className="h-3 w-32" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="md:col-span-1">
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-32" />
                                </CardHeader>
                                <CardContent className="h-80">
                                    <Skeleton className="w-full h-full rounded-md" />
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-1">
                                <CardHeader className="pb-2">
                                    <Skeleton className="h-5 w-40" />
                                </CardHeader>
                                <CardContent className="h-80">
                                    <Skeleton className="w-full h-full rounded-md" />
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </motion.div>
        </div>

    )
}
