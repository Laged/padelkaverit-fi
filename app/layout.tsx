// app/layout.tsx

import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from 'next/font/google'; // Import Google Fonts
import "./globals.css";


// Initialize Poppins font for headings
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['800'], // Bold weight for headings
  variable: '--font-poppins', // CSS variable for Poppins
});

// Initialize Source Sans 3 font for paragraphs
const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500'], // Regular and medium weights for paragraphs
  variable: '--font-source-sans-3', // CSS variable for Source Sans Pro
});

export const metadata: Metadata = {
  title: "Padelkaverit Ry",
  description: "Good vibes only.",
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
        {children}
      </body>
    </html>
  );
}
