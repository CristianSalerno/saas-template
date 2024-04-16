"use client";

import { captureException } from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  captureException(error);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
