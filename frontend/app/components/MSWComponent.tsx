'use client';

import { useEffect } from 'react';

export default function MSWComponent() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        console.log('MSW enabled');
        import('@/app/mocks/browser');
      }
    }
  }, []);

  return null;
}