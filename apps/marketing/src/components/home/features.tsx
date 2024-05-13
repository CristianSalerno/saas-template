import Image from "next/image";
import { Box } from "@/components/base/box";

export interface FeaturesProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subHeadline: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  items: {
    name: string;
    description: string;
    icon?: React.ReactNode;
  }[];
}

export function Features({
  headline,
  subHeadline,
  description,
  items,
  image,
}: FeaturesProps) {
  return (
    <Box className="max-w-7xl px-6 lg:px-8">
      {/* Grid */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              {headline}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {subHeadline}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {items.map((item) => (
                <div key={item.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    {item.icon}
                    {item.name}
                  </dt>{" "}
                  <dd className="inline">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={image.width}
            height={image.height}
          />
        ) : null}
      </div>
    </Box>
  );
}
