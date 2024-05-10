import { faker } from "@faker-js/faker";
import { eq } from "@repo/database";
import type { User } from "@repo/database/dto";
import { UserRole } from "@repo/database/dto";
import { user } from "@repo/database/schema";
import type { UserRepository } from "./user.repository";

export class UserRepositoryMock {
  userInfo(input: Parameters<UserRepository["userInfo"]>[0], options?: Partial<User>) {
    const id = input.id ? input.id : faker.string.nanoid();
    const email = input.email ? input.email : faker.internet.email();

    return {
      input,
      output: {
        id,
        email,
        name: faker.internet.userName(),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        emailVerified: faker.date.recent().toISOString(),
        image: faker.image.avatar(),
        role: options?.role ? options.role : UserRole.User,
      },
      drizzleInput: {
        email: {
          where: eq(user.email, email),
        },
        id: {
          where: eq(user.id, id),
        },
      },
    };
  }
}
