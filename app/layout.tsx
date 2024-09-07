import { ModalProvider } from "@/shared/providers/ModalProvider";
import { Epilogue } from "next/font/google";
import "@/public/styles/globals.scss";
import Script from "next/script";
import StoreProvider from "@/shared/lib/redux-store/StoreProvider";
import TanStackQueryProvider from "@/shared/providers/TanStackQueryProvider";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
      </head>
      <body className={epilogue.className}>
        <TanStackQueryProvider>
          <StoreProvider>
            <ModalProvider />
            {children}
          </StoreProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
