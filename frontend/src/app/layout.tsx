import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {getGlobalPageData, getGlobalPageMetadata} from "@/lib/loaders";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = await getGlobalPageMetadata();  
  return{
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
      <body className={inter.className}>
      <Header data={globalData.header}/>
      {children}
      <Footer data={globalData.footer}/>
      </body>
    </html>
  );
}
