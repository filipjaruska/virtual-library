"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface BooksNavigationMenuProps {
  tags: string[];
  activeTag: string;
  onTagSelect: (tag: string) => void;
}

export function BooksNavigationMenu({
  tags,
  activeTag,
  onTagSelect,
}: BooksNavigationMenuProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/books" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={(event) => {
                event.preventDefault();
                onTagSelect("");
              }}
            >
              All books
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {activeTag ? `Genre: ${activeTag}` : "Genres"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] grid-cols-2 gap-1 p-3 sm:w-[420px] sm:grid-cols-3">
              {tags.map((tag) => (
                <li key={tag}>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => onTagSelect(tag)}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-left text-sm capitalize transition-colors hover:bg-accent hover:text-accent-foreground",
                        tag === activeTag && "bg-accent text-accent-foreground"
                      )}
                    >
                      {tag}
                    </button>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
