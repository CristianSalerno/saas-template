"use client";

import Script from "next/script";
import { env } from "@repo/common/client-env";

export function MicrosoftClarity() {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${env.MICROSOFT_CLARITY}");
                `,
      }}
      id="microsoft-clarity-init"
      strategy="afterInteractive"
    />
  );
}
