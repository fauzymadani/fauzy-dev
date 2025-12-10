import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Fauzy Madani - Backend Developer",
    description: "Backend developer specializing in Go and Laravel/PHP. Building scalable APIs, optimizing databases, and maintaining production systems. Student & on-call engineer.",
    keywords: ["Backend Developer", "Go Developer", "Laravel Developer", "PHP Developer", "API Development", "Database Optimization", "DevOps", "AWS", "GCP"],
    authors: [{name: "Fauzy Madani"}],
    creator: "Fauzy Madani",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Fauzy Madani - Backend Developer",
        description: "Backend developer specializing in Go and Laravel/PHP. Building scalable APIs and maintaining production systems.",
        siteName: "Fauzy Madani Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Fauzy Madani - Backend Developer",
        description: "Backend developer specializing in Go and Laravel/PHP. Building scalable APIs and maintaining production systems.",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
