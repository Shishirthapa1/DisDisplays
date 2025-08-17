// package
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ReduxProvider } from "./provider";
import { Toaster } from "react-hot-toast"
// lib
import { cn } from "@/lib/utils";

// css
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dis Displays",
  description: "A Ecommerce store for all your car accessories and car display needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)}>
      <body>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              // Default styles (applied to all toasts)
              style: {
                borderRadius: '8px',
                padding: '12px 16px',
                fontWeight: '500',
              },

              // Success toast styles
              success: {
                style: {
                  background: '#d1fae5', // light-green (Tailwind: green-100)
                  color: '#065f46',      // dark-green text (Tailwind: green-800)
                },
                iconTheme: {
                  primary: '#10b981',    // Tailwind: green-500
                  secondary: '#ecfdf5',  // light bg
                },
              },

              // Error toast styles
              error: {
                style: {
                  background: '#fee2e2', // light-red (Tailwind: red-100)
                  color: '#991b1b',      // dark-red text (Tailwind: red-800)
                },
                iconTheme: {
                  primary: '#ef4444',    // Tailwind: red-500
                  secondary: '#fef2f2',
                },
              },
            }}
          />

        </ReduxProvider>
      </body>
    </html>
  );
}
