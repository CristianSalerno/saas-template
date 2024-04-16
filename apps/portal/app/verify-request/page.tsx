import { Metadata } from "next";

export type VerifyRequestPageProps = {
  searchParams: {
    provider: string;
    type: string;
  };
};

export const metadata: Metadata = {
  title: "Verify Request",
  description: "Sign in to your account.",
};

async function SignInPage({ searchParams }: VerifyRequestPageProps) {
  return (
    <div className="bg-background overflow-hidden shadow-md md:shadow-xl">
      <div className="container relative hidden h-lvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div
            className={`
            relative z-20 
            flex items-center 
            text-lg font-medium
            `}>
            <svg
              className="mr-2 size-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and helped me
                deliver stunning designs to my clients faster than ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className=" lg:p-8">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
            <p className="text-muted-foreground text-sm">
              We sent a sign-in link to your email address.
            </p>
            <p className="text-muted-foreground text-sm">Click the link to sign in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
