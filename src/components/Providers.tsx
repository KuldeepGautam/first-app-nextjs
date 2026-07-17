"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#000000" showSpinner={false} />
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
