"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { GiBlackHoleBolas } from "react-icons/gi"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const getVariant = (theme: string) => {
        switch (theme) {
            case 'dark':
                return 'dark'
            case 'odark':
                return 'outline' // or any other variant you want for 'odark'
            default:
                return 'outline'
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={getVariant(resolvedTheme!.toString())} size="icon">
                    <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === 'light' ? 'scale-100' : 'scale-0'}`} />
                    <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === 'dark' ? 'scale-100' : 'scale-0'}`} />
                    <GiBlackHoleBolas className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${resolvedTheme === 'odark' ? 'scale-100' : 'scale-0'}`} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {['light', 'dark', 'odark'].map(theme => (
                    <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                        {theme}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
