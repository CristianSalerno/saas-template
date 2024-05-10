"use client";

import { signIn } from "@repo/auth/react";
import { Button } from "@repo/ui";
import { Icons } from "@repo/ui/icons";
import { useState } from "react";

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", {
      redirectTo: "/dashboard",
    });
  };

  return (
    <Button
      className="w-full"
      isLoading={isLoading}
       
      onClick={handleGoogleSignIn}
      startIcon={<Icons.Google className="mr-2 size-4" />}
      type="submit"
      variant="outline">
      Google
    </Button>
  );
}
