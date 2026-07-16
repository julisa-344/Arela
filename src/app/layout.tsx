import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MainOffset } from "@/components/layout/MainOffset";
import { WhatsappFloatingButton } from "@/components/layout/WhatsappFloatingButton";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.description}`,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-arela-cream text-arela-ink">
        <AuthProvider>
          <CartProvider>
            <Header />
            <MainOffset>{children}</MainOffset>
            <Footer />
            <WhatsappFloatingButton />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
