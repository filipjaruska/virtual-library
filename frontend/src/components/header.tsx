import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiBookstack } from "react-icons/si";
import { getUserMeLoader } from "@/lib/services/get-user-me-loader";
import { LogoutButton } from "@/components/ui/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/ui/theme-toggle";
import { BreadcrumbsNavigation } from "./custom-ui/breadcrumb-navigation";

interface HeaderProps {
    data: {
        logoText: {
            id: number;
            text: string;
            url: string;
        }
        ctaButton: {
            id: number;
            text: string;
            url: string;
        };
    }
}

export async function Header({ data }: Readonly<HeaderProps>) {
    if (!data) {
        return (
            <div className="flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground shadow-md">
                <div className="flex items-center gap-4">
                    <Link className="flex flex-row gap-4 items-center" href="/" tabIndex={-1}>
                        <SiBookstack className="min-h-10 min-w-10" />
                        <div className="text-2xl font-bold font-mono">Virtual Library</div>
                        <span className="sr-only">Virtual Library</span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </div>
        );
    }

    const { logoText, ctaButton } = data;
    const user = await getUserMeLoader();

    const getAvatarUrl = (image: any) => {
        if (!image) return "https://placehold.co/40x40";

        if (typeof image === 'string') return image;

        if (image.formats && image.formats.thumbnail && image.formats.thumbnail.url) {
            return image.formats.thumbnail.url;
        }

        if (image.url) return image.url;

        if (image.image && image.image.url) return image.image.url;

        return "https://placehold.co/40x40";
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground shadow-md">
            <div className="flex items-center gap-4">
                <Link className="flex flex-row gap-4 items-center" href="/" tabIndex={-1}>
                    <SiBookstack className="min-h-10 min-w-10" />
                    <div className="text-2xl font-bold font-mono">{logoText.text}</div>
                    <span className="sr-only">Virtual Library</span>
                </Link>
                <BreadcrumbsNavigation className="hidden md:flex" />
            </div>
            <div style={{ userSelect: "none" }} className="flex items-center gap-4" tabIndex={-1}>
                <ModeToggle />
                {!user.ok ? (
                    <Link href={ctaButton.url} tabIndex={-1}>
                        <Button>{ctaButton.text}</Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer hover:scale-105" tabIndex={-1}>
                                <AvatarImage src={getAvatarUrl(user.data?.image)} alt="User Avatar" height={40} width={40} />
                                <AvatarFallback>
                                    {user.data?.username ? user.data.username.substring(0, 2).toUpperCase() : "GU"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent tabIndex={-1}>
                            <DropdownMenuLabel style={{ userSelect: "none" }}>{user.data.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/dashboard">
                                <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                            </Link>
                            <Link href="/dashboard/account">
                                <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel><LogoutButton /></DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}