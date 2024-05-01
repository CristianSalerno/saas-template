import "reflect-metadata";
import { faker } from "@faker-js/faker";
import { PrismockClient } from "prismock";
import { Container, ContainerTokens, DependencyContainer } from "@repo/trpc/container";
import { UserRepository } from "./user.repository";
import { UserRepositoryMock } from "./user.repository.mock";

describe("[UserRepository] Methods Test Suite", () => {
  let container: DependencyContainer;
  const prisma = new PrismockClient();

  beforeEach(() => {
    container = Container.createChildContainer();
    container.register(ContainerTokens.Prisma, {
      useValue: prisma,
    });
    container.register(UserRepository, UserRepository);
  });

  afterEach(() => {
    container.reset();
  });

  it("should be resolved by the container", async () => {
    // Dependencies
    expect(container.isRegistered(ContainerTokens.Prisma)).toBeTruthy();

    // Repository
    expect(container.isRegistered(UserRepository)).toBeTruthy();
    expect(container.resolve(UserRepository)).toBeTruthy();
  });

  it("should return user info by email", async () => {
    const repository = container.resolve(UserRepository);
    const userInfoMock = new UserRepositoryMock().userInfo({
      email: faker.internet.email(),
    });

    jest.spyOn(prisma.user, "findFirst").mockResolvedValue(userInfoMock.output);

    // Act
    const result = await repository.userInfo(userInfoMock.input);

    // Assert
    expect(result).toBeDefined();
    expect(result?.email).toBe(userInfoMock.input.email);
    expect(prisma.user.findFirst).toHaveBeenCalledWith(userInfoMock.prismaInput);
  });

  it("should return user info by id", async () => {
    const repository = container.resolve(UserRepository);
    const userInfoMock = new UserRepositoryMock().userInfo({
      id: faker.string.uuid(),
    });

    jest.spyOn(prisma.user, "findFirst").mockResolvedValue(userInfoMock.output);

    // Act
    const result = await repository.userInfo(userInfoMock.input);

    // Assert
    expect(result).toBeDefined();
    expect(result?.id).toBe(userInfoMock.input.id);
    expect(prisma.user.findFirst).toHaveBeenCalledWith(userInfoMock.prismaInput);
  });
});
