import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Schedi - Static Prototype",
  description: "Static pages for the Schedi prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="app-root min-h-screen flex bg-app-back">
          <Sidebar />
          <main className="flex-1 p-8 sm:p-12">{children}</main>
        </div>
      </body>
    </html>
  );
}
