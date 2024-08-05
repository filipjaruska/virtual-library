import Link from "next/link";
import { Button } from "@/components/ui/button";
import {getUserMeLoader} from "@/lib/services/get-user-me-loader";
import {LogoutButton} from "@/components/ui/logout-button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
    const { logoText, ctaButton } = data;
    const user = await getUserMeLoader();
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
            <div>{logoText.text}</div>
            <div style={{ userSelect: "none" }} className="flex items-center gap-4">
                {!user.ok ? <Link href={ctaButton.url}><Button>{ctaButton.text}</Button></Link> :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer hover:scale-105">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{user.data.username.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel style={{ userSelect: "none" }}>{user.data.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={"/dashboard"}><DropdownMenuItem className="cursor-pointer" >Profile</DropdownMenuItem></Link>
                            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel><LogoutButton/></DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>
    );
}