import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CommandBar from "@/components/custom-ui/command-bar";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import ThemeProvider from "@/components/ui/theme-provider";
import { getGlobal } from "@/lib/content";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();

  return {
    title: {
      default: global.title,
      template: `%s · ${global.title}`,
    },
    description: global.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const global = await getGlobal();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "odark"]}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header data={global.header} />
            <main className="flex-1">{children}</main>
            <Footer data={global.footer} />
          </div>
          <CommandBar />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
