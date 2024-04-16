import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { UserRole } from "@repo/database";
import { CreateUserSchema } from "./create-user.schema";

describe("Create User Schema", () => {
  it("Successfully parses payload", () => {
    const payload = {
      email: faker.internet.email(),
      name: faker.person.firstName(),
      role: UserRole.User,
      image: faker.image.url(),
    };

    expect(CreateUserSchema.parse(payload)).toMatchObject(payload);
  });

  it("Throws an error when payload in not correct", () => {
    const payload = {
      email: faker.internet.userName(),
    };

    expect(() => CreateUserSchema.parse(payload)).toThrowError();
  });
});
