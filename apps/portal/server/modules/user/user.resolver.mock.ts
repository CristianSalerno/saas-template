import { faker } from "@faker-js/faker";
import { User, UserRole } from "@repo/database";
import { Container } from "@repo/trpc/container";
import { UserResolver } from "./user.resolver";

export const createContextMock = () => ({
  session: {
    user: {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      name: faker.internet.userName(),
      role: UserRole.User,
    },
    expires: faker.date.recent().toISOString(),
  },
  container: Container.createChildContainer(),
});

export class UserResolverMock {
  info(input: Parameters<UserResolver["info"]>[0]["input"]) {
    const context = createContextMock();
    return {
      ctx: context,
      input,
      output: {
        ...context.session.user,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        emailVerified: faker.date.recent(),
      } satisfies User,
    };
  }
}
