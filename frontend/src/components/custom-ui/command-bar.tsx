"use client";

import {
  type Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { BarChart3, BookOpen, Home, Library, Moon, Sun } from "lucide-react";
import { GiBlackHoleBolas } from "react-icons/gi";

export default function CommandBar({ children }: { children?: React.ReactNode }) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const actions: Action[] = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: ["n", "h"],
      keywords: "home landing start",
      perform: () => router.push("/"),
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: "books",
      name: "Books",
      section: "Navigation",
      shortcut: ["n", "b"],
      keywords: "books catalogue collection browse",
      perform: () => router.push("/books"),
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "shelf",
      name: "My shelf",
      section: "Navigation",
      shortcut: ["n", "s"],
      keywords: "shelf favourites favorites reading list",
      perform: () => router.push("/shelf"),
      icon: <Library className="h-5 w-5" />,
    },
    {
      id: "stats",
      name: "Library statistics",
      section: "Navigation",
      shortcut: ["n", "i"],
      keywords: "statistics stats charts information",
      perform: () => router.push("/stats"),
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      id: "theme-light",
      name: "Light theme",
      section: "Theme",
      shortcut: ["t", "l"],
      keywords: "light theme bright",
      perform: () => setTheme("light"),
      icon: <Sun className="h-5 w-5" />,
    },
    {
      id: "theme-dark",
      name: "Dark theme",
      section: "Theme",
      shortcut: ["t", "d"],
      keywords: "dark theme night",
      perform: () => setTheme("dark"),
      icon: <Moon className="h-5 w-5" />,
    },
    {
      id: "theme-odark",
      name: "OLED dark theme",
      section: "Theme",
      shortcut: ["t", "o"],
      keywords: "oled dark black theme",
      perform: () => setTheme("odark"),
      icon: <GiBlackHoleBolas className="h-5 w-5" />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh]">
          <KBarAnimator className="w-full max-w-lg overflow-hidden rounded-lg border bg-card text-card-foreground shadow-2xl">
            <KBarSearch
              className="w-full border-b border-border bg-transparent p-4 text-base outline-none"
              defaultPlaceholder="Type a command or search…"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {item}
          </div>
        ) : (
          <div
            className={`flex items-center justify-between px-4 py-2.5 text-sm ${
              active ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </div>
            {item.shortcut?.length ? (
              <div className="flex gap-1">
                {item.shortcut.map((key) => (
                  <kbd
                    key={key}
                    className={`rounded px-1.5 py-0.5 text-xs ${
                      active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}
