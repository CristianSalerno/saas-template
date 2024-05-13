import Image from "next/image";
import { Box } from "@/components/base/box";

interface ScrollingLogosProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  items: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

export function ScrollingLogos({ title, items }: ScrollingLogosProps) {
  return (
    <Box className="max-w-7xl py-24">
      <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
        {title}
      </h2>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        {items.map((item) => (
          <Image
            key={item.src}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
        ))}
      </div>
    </Box>
  );
}
