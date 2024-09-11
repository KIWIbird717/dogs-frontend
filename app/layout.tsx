"use client";

import { ModalProvider } from "@/shared/providers/ModalProvider";
import { Epilogue } from "next/font/google";
import "@/public/styles/globals.scss";
import Script from "next/script";
import StoreProvider from "@/shared/lib/redux-store/StoreProvider";
import TanStackQueryProvider from "@/shared/providers/TanStackQueryProvider";
import { usePreventZoom } from "@/shared/hooks/usePreventZoom";
import { useOnTelegramWebAppRefresh } from "@/shared/hooks/useOnTelegramWebAppRefresh";
import { Toaster } from "react-hot-toast";

const epilogue = Epilogue({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  usePreventZoom();
  useOnTelegramWebAppRefresh();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={epilogue.className}>
        <TanStackQueryProvider>
          <StoreProvider>
            <Toaster />
            <ModalProvider />
            <div className="relative w-svw max-w-[100svw] overflow-x-hidden">{children}</div>
          </StoreProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
