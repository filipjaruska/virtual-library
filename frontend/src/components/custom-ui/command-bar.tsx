'use client'
import React from 'react';
import { KBarPortal, KBarPositioner, KBarAnimator, KBarSearch, useMatches, Action, KBarProvider, KBarResults } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { FaBook, FaHome } from 'react-icons/fa';
import { MdAccountCircle, MdDashboard, MdOutlineLogout } from 'react-icons/md';
import { Moon, Sun } from "lucide-react";
import { GiBlackHoleBolas } from "react-icons/gi";
import { logoutAction } from '@/lib/actions/auth-actions';

interface CommandBarProps extends React.HTMLAttributes<HTMLDivElement> { }

const CommandBar = ({ children }: CommandBarProps) => {
    const router = useRouter();
    const { setTheme } = useTheme();
    const actions: Action[] = [
        {
            id: "home",
            name: "Home",
            section: "Navigation",
            shortcut: ["n", "h"],
            keywords: "home, virtual library",
            perform: () => router.push("/"),
            icon: <FaHome className="w-5 h-5" />,
        },
        {
            id: "books",
            name: "Books",
            section: "Navigation",
            shortcut: ["n", "b"],
            keywords: "books",
            perform: () => router.push("/books"),
            icon: <FaBook className="w-5 h-5" />,
        },
        {
            id: "dashboard",
            name: "Dashboard",
            section: "Navigation",
            shortcut: ["n", "d"],
            keywords: "dashboard, user dashboard",
            perform: () => router.push("/dashboard"),
            icon: <MdDashboard className="w-5 h-5" />,
        },
        {
            id: "account",
            name: "Account",
            section: "Navigation",
            shortcut: ["n", "a"],
            keywords: "account, account settings, user settings",
            perform: () => router.push("/dashboard/account"),
            icon: <MdAccountCircle className="w-5 h-5" />,
        },
        {
            id: "theme-light",
            name: "Light Theme",
            section: "Theme",
            shortcut: ["t", "l"],
            keywords: "light theme",
            perform: () => setTheme("light"),
            priority: 777,
            icon: <Sun className="w-5 h-5" />,
        },
        {
            id: "theme-dark",
            name: "Dark Theme",
            section: "Theme",
            shortcut: ["t", "d"],
            keywords: "dark theme",
            perform: () => setTheme("dark"),
            priority: 777,
            icon: <Moon className="w-5 h-5" />,
        },
        {
            id: "theme-odark",
            name: "OLED Dark Theme",
            section: "Theme",
            shortcut: ["t", "o"],
            keywords: "oled dark theme, odark theme",
            perform: () => setTheme("odark"),
            priority: 777,
            icon: <GiBlackHoleBolas className="w-5 h-5" />,
        },
        {
            id: "logout",
            name: "Logout",
            section: "Actions",
            shortcut: ["l", "o"],
            keywords: "logout, sign out, log out",
            perform: () => logoutAction(),
            priority: 888,
            icon: <MdOutlineLogout className="w-5 h-5" />,
        },
    ];

    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black">
                    <KBarAnimator className="w-full max-w-md bg-card text-card-foreground rounded-md shadow-md">
                        <KBarSearch className="w-full p-2 text-base bg-transparent border-none outline-none" />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            {children}
        </KBarProvider>
    );
};

const RenderResults = () => {
    const { results } = useMatches();
    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className={`p-2 text-sm ${active ? 'bg-primary' : ''}`}>{item}</div>
                ) : (
                    <div className={`p-2 text-sm ${active ? 'bg-primary' : ''}`}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                {item.icon && <div className="mr-2">{item.icon}</div>}
                                <div>
                                    <div className="font-semibold">{item.name}</div>
                                    {item.section && <div className="text-xs text-gray-500">{item.section.toString()}</div>}
                                    {item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}
                                </div>
                            </div>
                            {item.shortcut?.length ? (
                                <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                                    {item.shortcut.join(' + ')}
                                </div>
                            ) : null}
                        </div>
                    </div>
                )
            }
        />
    );
};

export default CommandBar;