// FILE: src/pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import NavBar from "@/components/navbar";
import { auth } from "../../firebase";
import { Inter, Kanit } from 'next/font/google';
import { DASHBOARD_ROUTE } from "@/routes";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const pathname = usePathname();
  const isAuthRoute = pathname ? pathname.startsWith('/auth/') : false;

  const routes = [
    '/auth/',
    '/dashboard',
    '/log',
    '/profile',
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/auth/signin')
      }
    });
    const isValidRoute = routes.some((route) => pathname.startsWith(route));
    if (!isValidRoute) {
      router.replace(DASHBOARD_ROUTE);
    }
    
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex justify-center items-start bg-secondary mx-auto w-full h-full min-h-screen">
      <div className="flex justify-center items-start w-full min-h-screen">
        <Component {...pageProps} />
        {!isAuthRoute && <NavBar />}
      </div>
    </main>
  );
}
