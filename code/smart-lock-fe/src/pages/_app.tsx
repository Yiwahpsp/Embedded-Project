// FILE: src/pages/_app.tsx
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import type { AppProps } from "next/app";
import NavBar from "@/components/navbar";
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
  const pathname = usePathname();

  // Check if the current path should exclude the NavBar
  const isAuthRoute = pathname ? pathname.startsWith('/auth') : false;

  return (
    <>
      <main className="flex justify-center items-start bg-secondary mx-auto w-full h-full min-h-screen">
        <div
          className={`${kanit.className} ${inter.className} pb-20 p-4 w-full lg:max-w-lg h-full min-h-screen text-primary bg-secondary container`}
        >
          <Component {...pageProps} />
        </div>
      </main>
      {!isAuthRoute && (
        <div className="flex justify-center items-center w-full">
          <NavBar />
        </div>
      )}
    </>
  );
}
