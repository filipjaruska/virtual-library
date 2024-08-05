import Link from "next/link";
import { Button } from "@/components/ui/button";
import {getUserMeLoader} from "@/lib/services/get-user-me-loader";
import {LogoutButton} from "@/components/ui/logout-button";

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
            <div className="flex items-center gap-4">
                {!user.ok ? <Link href={ctaButton.url}><Button>{ctaButton.text}</Button></Link> : <LogoutButton/>}
            </div>
        </div>
    );
}