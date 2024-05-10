"use client";

import { type PropsWithChildren, useEffect } from "react";
// @ts-expect-error -- no types
import { AnalyticsProvider } from "use-analytics";
import { usePathname } from "next/navigation";
import { analytics } from "../analytics";

export function AnalyticsWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // TODO: revisit this
  useEffect(() => {
    void analytics.page();
  }, [pathname]);

  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>;
}
