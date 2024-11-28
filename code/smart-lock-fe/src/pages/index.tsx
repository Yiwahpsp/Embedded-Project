import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard'); // Redirect without keeping '/' in history
  }, [router]);

  return null;
}
