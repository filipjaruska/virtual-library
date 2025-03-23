"use client"

import type { BookComment } from "@/lib/types/books"
import { motion, AnimatePresence } from "motion/react"

export function CommentsList({ comments }: { comments: BookComment[] }) {
    return (
        <AnimatePresence>
            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                        <div className="bg-card p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-muted-foreground">
                                {comment.user?.username || "Anonymous"} • {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-base text-card-foreground">{comment.content}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    )
}

