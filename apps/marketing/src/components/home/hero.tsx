interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string;
  subHeadline: string;
  cta: string;
  ups?: string;
}

export function Hero({ headline, subHeadline, cta, ups }: HeroProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        {headline}
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">{subHeadline}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {cta}
        </a>
        {ups ? (
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            {ups} <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
