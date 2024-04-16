import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { loginQuerySchema } from "./auth";

describe("Login Query Schema", () => {
  it("Successfully parses payload", () => {
    const payload = {
      email: faker.internet.email(),
    };

    expect(loginQuerySchema.parse(payload)).toMatchObject(payload);
  });

  it("Throws an error when payload in not correct", () => {
    const payload = {
      email: faker.internet.userName(),
    };

    expect(() => loginQuerySchema.parse(payload)).toThrowError();
  });
});
