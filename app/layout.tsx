import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "BS Friend",
  description: "An AI-powered bible study app.",
  keywords: ["Bible study app", "AI Bible chatbot", "Bible study friend", "scripture notes"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
