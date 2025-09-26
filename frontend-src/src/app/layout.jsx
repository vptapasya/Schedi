import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DashboardProvider } from '../context/DashboardContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';



export const metadata = {
  title: "Schedi - Static Prototype",
  description: "Static pages for the Schedi prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DashboardProvider>
          <Navbar />
          <Sidebar />
          <div className="pl-64 pt-16">{children}</div>
        </DashboardProvider>
      </body>
    </html>
  );
}
