// src/QueryClientProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const CustomQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default CustomQueryClientProvider;
