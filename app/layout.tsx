// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Initialize Poppins font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-poppins",
});

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-source-sans-3",
});

export const metadata: Metadata = {
  title: "Padelkaverit Ry",
  description: "Good vibes only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${sourceSansPro.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
