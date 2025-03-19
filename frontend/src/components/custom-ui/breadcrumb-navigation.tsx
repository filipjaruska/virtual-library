"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function BreadcrumbsNavigation({ className }: { className?: string }) {
    const pathname = usePathname()
    const isBookRoute = pathname === '/' || pathname.startsWith('/books') || pathname.startsWith('/dashboard')
    const pathSegments = pathname === '/' ? ['books'] : pathname.split('/').filter(Boolean)

    if (!isBookRoute) return null

    return (
        <nav aria-label="Breadcrumb" className={`py-2 bg-secondary ${className}`} tabIndex={-1}>
            <ol className="flex flex-row items-center space-x-2 text-xl font-semibold">
                {pathname === '/' ? (
                    <div className="flex flex-row items-center">
                        <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                        <Link href="/books" className="text-primary hover:text-primary/80 transition-colors">
                            Books
                        </Link>
                    </div>
                ) : (
                    pathSegments.map((segment, index) => {
                        const href = `/${pathSegments.slice(0, index + 1).join('/')}`
                        const isLast = index === pathSegments.length - 1
                        const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1)

                        return (
                            <li key={href} className="flex items-center">
                                <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                                {isLast ? (
                                    <span className="text-muted-foreground" aria-current="page">
                                        {capitalizedSegment}
                                    </span>
                                ) : (
                                    <Link href={href} className="text-primary hover:text-primary/80 transition-colors">
                                        {capitalizedSegment}
                                    </Link>
                                )}
                            </li>
                        )
                    })
                )}
            </ol>
        </nav>
    )
}