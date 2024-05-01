import { faker } from "@faker-js/faker";
import { User, UserRole } from "@repo/database";
import { UserRepository } from "./user.repository";

export class UserRepositoryMock {
  userInfo(input: Parameters<UserRepository["userInfo"]>[0], options?: Partial<User>) {
    return {
      input,
      output: {
        id: input.id ? input.id : faker.string.uuid(),
        email: input.email ? input.email : faker.internet.email(),
        name: faker.internet.userName(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        emailVerified: faker.date.recent(),
        image: faker.image.avatar(),
        role: options?.role ? options.role : UserRole.User,
      },
      prismaInput: {
        where: {
          OR: [
            {
              email: input.email,
            },
            {
              id: input.id,
            },
          ],
        },
      },
    };
  }
}
