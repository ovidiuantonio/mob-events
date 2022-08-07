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
            <meta name="theme-color" content="#feb700" />
            <meta name="description" content="Mob Events" />
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.js"
              integrity="sha512-bUg5gaqBVaXIJNuebamJ6uex//mjxPk8kljQTdM1SwkNrQD7pjS+PerntUSD+QRWPNJ0tq54/x4zRV8bLrLhZg=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            ></script>
            <script src="nprogress.js"></script>

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
