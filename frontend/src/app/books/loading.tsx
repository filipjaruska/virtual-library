"use client"
import { FaSearch } from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import BookCardSkeleton from "@/components/custom-ui/skeleton-book-card"
import { MdKeyboardCommandKey } from "react-icons/md"
import { motion } from "motion/react"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoadingBooksPage() {
    return (
        <motion.div initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <header className="flex items-center justify-between bg-secondary px-2 py-2 border-b border-primary">
                <div className="flex space-x-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24 hidden md:block" />
                    <Skeleton className="h-10 w-24 hidden lg:block" />
                </div>

                <div className="relative flex items-center">
                    <div className="relative">
                        <Skeleton className="h-10 px-4 py-2 rounded-lg min-w-fit lg:min-w-96 ml-2" />
                        <span className="absolute right-10 text-gray-500/50 flex items-center">
                            <MdKeyboardCommandKey />
                            +F
                        </span>
                        <FaSearch className="absolute right-3 top-2/4 transform -translate-y-2/4 text-card-foreground/50" />
                    </div>
                </div>

                <div className="ml-4">
                    <Select disabled>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                    </Select>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <BookCardSkeleton key={index} index={index} />
                ))}
            </div>

            <div className="flex justify-center p-4">
                <Skeleton className="h-10 w-64" />
            </div>
        </motion.div>
    )
}

