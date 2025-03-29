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
import { ImBooks } from "react-icons/im";
import { useRouter } from "next/navigation";

const components = [
    {
        title: "Sci-fi",
        tag: "sci-fi",
        description:
            "Sci-fi typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It is related to fantasy, horror, and superhero fiction and contains many subgenres.",
    },
    {
        title: "Fiction",
        tag: "fiction",
        description:
            "Fiction is portraying individuals, events, or places that are imaginary.",
    },
    {
        title: "Romance novel",
        tag: "romance novel",
        description:
            "A romance novel or romantic novel is a genre fiction novel that primary focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending.",
    },
    {
        title: "Thriller",
        tag: "thriller",
        description: "Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction..",
    },
    {
        title: "Children's literature",
        tag: "children's literature",
        description:
            "Children's literature or juvenile literature includes stories, books, magazines, and poems that are created for children.",
    },
    {
        title: "Biography",
        tag: "biography",
        description:
            "A biography, or simply bio, is a detailed description of a person's life.",
    },
];

interface BooksNavigationMenuProps {
    onTagSelect?: (tag: string) => void;
}

export function BooksNavigationMenu({ onTagSelect }: BooksNavigationMenuProps) {
    const router = useRouter();

    const handleTagChange = (tag: string) => {
        if (onTagSelect) {
            onTagSelect(tag);
            return;
        }

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('tag', tag);
        router.push(currentUrl.toString(), { scroll: false });
    };

    return (
        <NavigationMenu>
            <NavigationMenuList className="flex">
                <NavigationMenuItem>
                    <Link href="/books" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            onClick={() => handleTagChange('')}>
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
                                        className="flex h-full w-full select-none flex-col hover:cursor-pointer justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-primary"
                                        onClick={() => handleTagChange('popular')}
                                    >
                                        <ImBooks className="h-6 w-6" />
                                        <div className="mb-2 mt-4 text-lg font-medium ">
                                            Popular
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed books that you can borrow and
                                            take into your home. Accessible. Free.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem onClick={() => handleTagChange('new')} title="New Releases">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem onClick={() => handleTagChange('upcoming')} title="Upcoming Releases">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem onClick={() => handleTagChange('gold')} title="Hidden Gold">
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
                                    onClick={() => handleTagChange(component.tag)}
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
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:cursor-pointer",
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
