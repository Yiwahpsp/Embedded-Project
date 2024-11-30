// FILE: src/pages/_app.tsx
import "@/styles/globals.css";
import { useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AppProps } from "next/app";
import NavBar from "@/components/navbar";
import { Inter, Kanit } from 'next/font/google';
import { AuthProvider, useAuth } from "@/contexts/authContext";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

function AuthWrapper({
  children
}: {
  children: ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthRoute = pathname ? pathname.startsWith('/auth') : false;
  const { userLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!loading && !userLoggedIn && !isAuthRoute) {
      router.push('/auth/signin');
    }
  }, [userLoggedIn, isAuthRoute, loading, router]);

  if (loading) {
    // Show a loader or placeholder while waiting for the authentication state to resolve
    return <div>Loading...</div>;
  }

  if (!userLoggedIn && !isAuthRoute) {
    return null;
  }

  return (
    <div className="w-full min-h-screen">
      {children}
      {!isAuthRoute && <NavBar />}
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className="flex justify-center items-start bg-secondary mx-auto w-full h-full min-h-screen">
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </main>
    </AuthProvider>
  );
}
