import DashboardSidebar from "@/components/custom-ui/dashboard-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            <div className="flex min-h-screen flex-col bg-muted/40">
                <DashboardSidebar />
                <div className="flex-1 transition-all duration-300 ease-in-out sm:ml-14">
                    <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        {children}
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
}