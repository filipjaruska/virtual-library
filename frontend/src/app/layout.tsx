import CommandBar from "@/components/custom-ui/command-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import ThemeProvider from "@/components/ui/theme-provider";
import { getGlobalPageData, getGlobalPageMetadata } from "@/lib/loaders";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from './providers';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
    const metadata: Metadata = await getGlobalPageMetadata();
    return {
        title: metadata.title,
        description: metadata.description,
    }
};


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    let globalData = await getGlobalPageData();
    if (!globalData) {
        return (
            <html lang="en" suppressHydrationWarning>
                <body className={`${roboto.className} min-h-screen bg-background antialiased`}>
                    <Providers>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <div className="flex flex-col items-center justify-center min-h-screen py-12">
                                <div className="text-center px-4">
                                    <h1 className="text-3xl font-bold mb-4">Unable to Load Content</h1>
                                    <p className="mb-8 text-muted-foreground">The server is currently unavailable. Please try again later.</p>
                                </div>
                            </div>
                        </ThemeProvider>
                    </Providers>
                </body>
            </html>
        );
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${roboto.className} min-h-screen bg-background antialiased`} >
                <Providers>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        themes={["light", "dark", "odark"]}
                        disableTransitionOnChange
                    >
                        <Header data={globalData?.header} />
                        {children}
                        <Footer data={globalData?.footer} />
                        <CommandBar />
                    </ThemeProvider>
                </Providers>
                <SpeedInsights />
            </body>
        </html>
    );
}
