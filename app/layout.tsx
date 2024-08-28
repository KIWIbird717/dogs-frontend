import { ModalProvider } from "@/shared/providers/ModalProvider";

("use client ");

import { Epilogue } from "next/font/google";
import "@/public/styles/globals.scss";
import Script from "next/script";
import StoreProvider from "@/shared/lib/redux-store/StoreProvider";

const epilogue = Epilogue({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={epilogue.className}>
        <StoreProvider>
          <ModalProvider />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
