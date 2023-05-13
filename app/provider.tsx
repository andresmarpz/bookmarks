"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
