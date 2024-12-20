import CommandBar from "@/components/custom-ui/command-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import ThemeProvider from "@/components/ui/theme-provider";
import { getGlobalPageData, getGlobalPageMetadata } from "@/lib/loaders";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    const globalData = await getGlobalPageData();
    return (
        <html lang="en">
            <body className={roboto.className}>
                <SpeedInsights />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
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
