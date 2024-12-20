"use client";
import { logoutAction } from "@/lib/actions/auth-actions"
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";

export function LogoutButton() {
    return (

        <button onClick={async () => {
            await logoutAction();
            redirect("/");
        }} className="flex flex-row items-center justify-center font-medium">
            <div style={{ userSelect: "none" }} className="pr-1 text-l">Logout</div>
            <LogOut className="w-4 h-4 hover:text-primary" />
        </button>

    );
}