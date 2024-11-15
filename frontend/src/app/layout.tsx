import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getGlobalPageData, getGlobalPageMetadata } from "@/lib/loaders";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ThemeProvider from "@/components/ui/theme-provider";
import CommandBar from "@/components/custom-ui/command-bar";

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
    const globalData = await getGlobalPageData();
    return (
        <html lang="en">
            <body className={roboto.className}>
                <SpeedInsights />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    themes={["light", "dark", "odark"]}
                    disableTransitionOnChange
                >
                    <Header data={globalData.header} />
                    {children}
                    <Footer data={globalData.footer} />
                    <CommandBar />
                </ThemeProvider>
            </body>
        </html>
    );
}
