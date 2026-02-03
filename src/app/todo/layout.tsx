"use client";

import { ApolloWrapper } from "@/components/apollo-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
