"use client";

import { PropsWithChildren, useEffect } from "react";
// @ts-expect-error -- no types
import { AnalyticsProvider } from "use-analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "../analytics";

export function AnalyticsWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page({
      search: searchParams.toString(),
      path: pathname,
    });
  }, [pathname, searchParams]);

  return <AnalyticsProvider instance={analytics}>{children}</AnalyticsProvider>;
}
