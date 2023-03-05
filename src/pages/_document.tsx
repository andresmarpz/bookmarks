import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-neutral-950 dark:text-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
