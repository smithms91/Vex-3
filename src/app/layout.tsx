import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const kanit = Kanit({ weight: ['400', '500', '600'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vex 3.0 | The Future of Business Cards",
  description: "The Future of Business Cards",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('max-w-[450px] mx-auto', kanit.className)}>
        <Toaster />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
