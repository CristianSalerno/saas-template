import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { UserRole } from "@repo/database";
import { UpdateUserSchema } from "./update-user.schema";

describe("Update User Schema", () => {
  it("Successfully parses payload", () => {
    const payload = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      image: faker.image.url(),
    };

    expect(UpdateUserSchema.parse(payload)).toMatchObject(payload);
  });

  it("Throws an error when payload in not correct", () => {
    const payload = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      role: UserRole.User,
      image: faker.image.url(),
    };

    try {
      UpdateUserSchema.parse(payload);
    } catch (err) {
      const error = err as ZodError;
      expect(error instanceof ZodError).toBe(true);
      expect(error.errors[0]?.message).toBe("Required");
      expect(error.errors[0]?.path[0]).toBe("id");
    }
  });
});
