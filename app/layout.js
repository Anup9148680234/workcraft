import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WorkCraft - Find Jobs Faster | Latest Jobs & Career Opportunities",
  description: "Find your next career opportunity with WorkCraft. Browse the latest jobs and advance your career.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script src="https://quge5.com/88/tag.min.js" data-zone="278912" async data-cfasync="false"></script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
