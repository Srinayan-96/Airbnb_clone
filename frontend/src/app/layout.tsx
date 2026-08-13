import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "A functional clone of the Airbnb web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <AuthProvider>
          {children}
          <AuthModal />
          <Toaster 
            position="bottom-left"
            toastOptions={{
              className: 'text-sm font-semibold text-ink shadow-lg',
              style: {
                borderRadius: '12px',
                padding: '16px 20px',
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
