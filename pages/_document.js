import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Preload de fontes */}
          <link
            rel="preload"
            href="/_next/static/media/a34f9d1faa5f3315-s.p.woff2"
            as="font"
            type="font/woff2"
            crossorigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
