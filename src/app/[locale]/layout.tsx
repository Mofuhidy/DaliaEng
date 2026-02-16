import type { Metadata } from "next";
import { Newsreader, Montserrat, IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DaliaEng Interiors",
  description: "Minimalist Luxury Interior Design Portfolio",
  icons: {
    icon: [
      { url: "/BlackLogo.ico", media: "(prefers-color-scheme: light)" },
      { url: "/WhiteLogo.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!["en", "ar"].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  // RTL direction logic
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${newsreader.variable} ${montserrat.variable} ${ibmPlexSansArabic.variable} antialiased bg-canvas text-navy`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
