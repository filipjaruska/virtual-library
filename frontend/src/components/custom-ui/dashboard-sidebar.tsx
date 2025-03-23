'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import { FaThLarge, FaInfoCircle, FaCog, FaBars } from "react-icons/fa";

export default function DashboardSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className="flex items-center justify-between bg-background p-4 sm:hidden">
                <button
                    className="p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FaBars className="h-6 w-6" />
                </button>
            </header>

            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 flex-col border-r bg-background transition-all duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0 sm:w-14 sm:flex`}
            >
                <nav className="flex flex-col items-start gap-4 px-4 py-5 sm:items-center sm:px-2">
                    <Link
                        className="flex items-center gap-4 mb-6 sm:flex-col sm:items-center sm:pb-0"
                        href="/"
                    >
                        <SiBookstack className="h-9 w-9" />
                        <span className="text-lg font-semibold sm:hidden">Virtual Library</span>
                    </Link>
                    <NavItem
                        href="/dashboard"
                        icon={<FaThLarge className="h-5 w-5" />}
                        label="Dashboard"
                        isActive={pathname === '/dashboard'}
                    />
                    <NavItem
                        href="/dashboard/information"
                        icon={<FaInfoCircle className="h-5 w-5" />}
                        label="Information"
                        isActive={pathname === '/dashboard/information'}
                    />
                    <NavItem
                        href="/dashboard/account"
                        icon={<FaCog className="h-5 w-5" />}
                        label="Account Settings"
                        isActive={pathname === '/dashboard/account'}
                    />
                </nav>
            </aside>

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
}

function NavItem({ href, icon, label, isActive }: { href: string; icon: React.ReactNode; label: string; isActive: boolean }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    className={`flex h-9 w-full items-center gap-4 rounded-lg transition-colors hover:text-foreground sm:w-9 sm:justify-center ${isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50'
                        }`}
                    prefetch={false}
                    aria-current={isActive ? 'page' : undefined}
                >
                    {icon}
                    <span className="sm:hidden">{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="hidden sm:block">
                {label}
            </TooltipContent>
        </Tooltip>
    );
}