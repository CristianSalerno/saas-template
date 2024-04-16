// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "@repo/config/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",

        "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
      ],
    },
  ],
};

export default config;
