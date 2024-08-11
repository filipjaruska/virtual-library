"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {ImBooks} from "react-icons/im";

const components = [
    {
        title: "Sci-fi",
        href: "/docs/primitives/alert-dialog",
        description:
            "Sci-fi typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It is related to fantasy, horror, and superhero fiction and contains many subgenres.",
    },
    {
        title: "Fiction",
        href: "/books/fiction",
        description:
            "Fiction is portraying individuals, events, or places that are imaginary.",
    },
    {
        title: "Romance novel",
        href: "/docs/primitives/progress",
        description:
            "A romance novel or romantic novel is a genre fiction novel that primary focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending.",
    },
    {
        title: "Thriller",
        href: "/docs/primitives/scroll-area",
        description: "Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction..",
    },
    {
        title: "Children's literature",
        href: "/docs/primitives/tabs",
        description:
            "Children's literature or juvenile literature includes stories, books, magazines, and poems that are created for children.",
    },
    {
        title: "Biography",
        href: "/docs/primitives/tooltip",
        description:
            "A biography, or simply bio, is a detailed description of a person's life.",
    },
];

export function BooksNavigationMenu() {
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex">
                <NavigationMenuItem onClick={handleRefresh}>
                    <Link href="/books" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            All
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Featured</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <ImBooks   className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Popular
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed books that you can borrow and
                                            take into your home. Accessible. Free.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/books" title="New Releases">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="/docs/installation" title="Upcoming Releases">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Hidden Gold">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Genres</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
