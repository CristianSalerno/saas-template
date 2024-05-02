import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { EmailLinkSchema } from "./email-link.schema";

describe("email Link Schema", () => {
  it("userInfoSchema: Successfully parses payload with email", () => {
    expect.hasAssertions();

    const payload = {
      email: faker.internet.email(),
    };

    expect(EmailLinkSchema.parse(payload)).toMatchObject(payload);
  });

  it("userInfoSchema: Throws an error when payload in not correct", () => {
    expect.hasAssertions();

    const payload = {};

    expect(() => EmailLinkSchema.parse(payload)).toThrow(ZodError);
    expect(() => EmailLinkSchema.parse(payload)).toThrow("Required");
  });

  it("userInfoSchema: Should throw an error when payload is undefined", () => {
    expect.hasAssertions();

    const payload = undefined;

    expect(() => EmailLinkSchema.parse(payload)).toThrow(ZodError);
    expect(() => EmailLinkSchema.parse(payload)).toThrow("Required");
  });
});
