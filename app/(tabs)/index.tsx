import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/opening');
    }, 100);  // 100ms 遅延させる

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}