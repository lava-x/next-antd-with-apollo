// import Document, { Head, Main, NextScript } from 'next/document';

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <html>
//         <Head>
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <link
//             rel="shortcut icon"
//             type="image/png"
//             href="/_next/static/favicon.ico"
//           />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/_next/static/favicon.ico"
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
