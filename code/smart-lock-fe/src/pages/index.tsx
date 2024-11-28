import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the current path is not '/dashboard'
    if (router.pathname !== '/dashboard') {
      // Redirect to '/dashboard'
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="">
      {/* Your content here */}
    </div>
  );
}