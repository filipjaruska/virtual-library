import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SiBookstack} from "react-icons/si";
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
import {ModeToggle} from "@/components/ui/theme-toggle";

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

export async function Header({data}: Readonly<HeaderProps>) {
    const {logoText, ctaButton} = data;
    const user = await getUserMeLoader();
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground shadow-md">
            <Link className={"flex flex-row gap-4 items-center"} href={"/"}>
                <SiBookstack className="min-h-10 min-w-10"/>
                <div className="text-2xl font-bold font-mono">{logoText.text}</div>
            </Link>
            <div style={{userSelect: "none"}} className="flex items-center gap-4">
                <ModeToggle/>
                {!user.ok ? <Link href={ctaButton.url}><Button>{ctaButton.text}</Button></Link> :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer hover:scale-105">
                                <AvatarImage src={user.data.image.url}/>
                                <AvatarFallback>{user.data.username.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel style={{userSelect: "none"}}>{user.data.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <Link href={"/dashboard"}><DropdownMenuItem
                                className="cursor-pointer">Dashboard</DropdownMenuItem></Link>
                            <Link href={"/dashboard/account"}><DropdownMenuItem
                                className="cursor-pointer">Account</DropdownMenuItem></Link>
                            <DropdownMenuSeparator/>
                            <DropdownMenuLabel><LogoutButton/></DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>
    );
}