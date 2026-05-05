import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Andre De la Cuesta — Designer & Developer",
  description:
    "Full-stack developer, graphic designer, and UI/UX designer based in Tandag City, Surigao Del Sur.",
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans text-base leading-normal">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');if(s==='dark')d.classList.add('dark');else if(s==='light')d.classList.remove('dark');else if(window.matchMedia('(prefers-color-scheme:dark)').matches)d.classList.add('dark');}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
