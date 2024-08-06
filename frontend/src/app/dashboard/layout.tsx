import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
export default function DashboardLayout({
                                            children,
                                        }: {
    readonly children: React.ReactNode;
}) {
    return (
        <div className="h-screen grid lg:grid-cols-[240px_1fr]">
            <nav className="border-r bg-gray-100/40 dark:bg-gray-800/40 hidden lg:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link
                            className="flex items-center gap-2 font-semibold"
                            href="/dashboard"
                        >
                            <MdDashboard  className="h-6 w-6" />
                            <span className="">Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/dashboard/profile"
                            >
                                <FaUser className="h-4 w-4" />
                                Profile
                            </Link>

                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="/dashboard/account"
                            >
                                <IoMdSettings   className="h-4 w-4" />
                                Account Settings
                            </Link>
                        </nav>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col overflow-scroll">{children}</main>
        </div>
    );
}
