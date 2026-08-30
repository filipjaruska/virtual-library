"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { GiBlackHoleBolas } from "react-icons/gi";
import { useTheme } from "next-themes";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "odark", label: "OLED dark", icon: GiBlackHoleBolas },
] as const;

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // The resolved theme is only known on the client, so the trigger shows a
  // stable placeholder icon during SSR rather than three invisible ones.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = THEMES.find((entry) => entry.value === resolvedTheme) ?? THEMES[0];
  const Icon = active.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change theme">
          {mounted ? <Icon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {THEMES.map((entry) => (
          <DropdownMenuItem
            key={entry.value}
            onClick={() => setTheme(entry.value)}
            className="cursor-pointer gap-2"
          >
            <entry.icon className="h-4 w-4" />
            {entry.label}
            {mounted && theme === entry.value && (
              <span className="ml-auto text-xs text-muted-foreground">active</span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer gap-2">
          <span className="h-4 w-4" />
          System
          {mounted && theme === "system" && (
            <span className="ml-auto text-xs text-muted-foreground">active</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
