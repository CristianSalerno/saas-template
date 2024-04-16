"use server";

import { signIn } from "../auth";

export const emailLinkSignIn = async (formData: FormData) => {
  return signIn("resend", formData);
};
