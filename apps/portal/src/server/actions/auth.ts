"use server";

import { signIn } from "@/server/auth";

export const emailLinkSignIn = async (formData: FormData) => {
  return signIn("resend", formData);
};
