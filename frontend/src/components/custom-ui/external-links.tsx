"use client"

import { ExternalLink } from "lucide-react"
import { motion } from "motion/react"

interface Link {
    name: string
    url: string
}

export function ExternalLinks({ links }: { links: Link[] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {links.map((link) => {
                return (
                    <motion.div key={link.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                            {link.name}
                        </a>
                    </motion.div>
                )
            })}
        </div>
    )
}

