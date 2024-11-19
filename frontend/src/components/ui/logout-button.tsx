import { logoutAction } from "@/lib/actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await logoutAction();
    };

    return (
        <button
            onClick={handleLogout}
            className="flex flex-row items-center justify-center font-medium"
        >
            <div style={{ userSelect: "none" }} className="pr-1 text-l">Logout</div>
            <LogOut className="w-4 h-4 hover:text-primary" />
        </button>
    );
}