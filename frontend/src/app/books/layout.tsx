export default function DashboardLayout({
                                            children,
                                        }: {
    readonly children: React.ReactNode;
}) {

    return (
        <div className="h-screen grid lg:grid-cols-[240px_1fr]">
            <nav className="border-r bg-secondary hidden lg:block pt-6 p-4 border-primary-200/40">
                <div className={"text-2xl font-semibold"}>Filter TIle</div>
                <div className="flex h-full max-h-screen flex-col gap-4 pt-8">
                    <div className="flex-1 overflow-auto py-2">
                        <div>Filters</div>
                        <div>asdf</div>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col overflow-scroll">
                {children}
            </main>
        </div>
    );
}
