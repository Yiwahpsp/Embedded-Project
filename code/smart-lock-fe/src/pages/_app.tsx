// FILE: src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Kanit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="flex justify-center items-start bg-primary mx-auto w-full h-full min-h-screen">
      <div className={`${kanit.className} ${inter.className} p-4 w-full lg:max-w-lg h-full min-h-screen text-primary bg-secondary container`}>
        <Component {...pageProps} />
      </div>
    </main>
  );
}