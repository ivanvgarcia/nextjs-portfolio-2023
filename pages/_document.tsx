import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-white dark:bg-gray-700 h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
