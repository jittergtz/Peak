import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peak",
  description: 'daily tasks habbit tracker',
  icons: [
    {
      url: "./peak-icon.png"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   
      <html
        lang="en"
        className={cn(inter.className, "dark")}
        style={{
          colorScheme: "dark",
        }}
      >
    <ClerkProvider 
        appearance={{
          variables: {
            colorPrimary: "black",
            colorText: "black"
          }
        }}
    >
        <body>
          <ThemeProvider>
        {children}
        <Toaster />
          </ThemeProvider>
        </body>
      </ClerkProvider>
       
      </html>

  );
}
