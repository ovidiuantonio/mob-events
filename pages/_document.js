import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <html lang='en'>
          <head>
            <meta charset='utf-8' />
            <link rel='icon' href='/logo-mob-png.png' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <meta name='theme-color' content='#000000' />
            <meta name='description' content='Mob Events' />

            <title>Mob Events</title>
          </head>
        </html>
      </Head>
      <body>
        <Script src='/liveTickets.js' />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
