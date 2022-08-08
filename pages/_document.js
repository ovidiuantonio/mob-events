import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <link rel="icon" href="/logo-mob-png.png" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="apple-touch-icon" href="/logo-mob-png.png"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossorigin
            ></link>
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
              rel="stylesheet"
            ></link>
            <meta name="theme-color" content="#feb700" />
            <meta name="description" content="Mob Events" />

            <title>Mob Events</title>
          </head>
        </html>
      </Head>
      <body>
        <Script src="/liveTickets.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
