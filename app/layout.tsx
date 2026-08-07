import type { Metadata } from "next";
import Header from "./components/Header";
import { ToastProvider } from "./components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skinstric",
  description:
    "Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-[#1A1B1C]">
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
