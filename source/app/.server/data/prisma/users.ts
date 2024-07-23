import type { User } from "@prisma/client";
import { prisma } from "./prisma";

export async function getUsers() {
  return await prisma.user.findMany({});
}

export async function searchUsers(query: string): Promise<User[]> {
  return await prisma.user.findMany({
    where: { firstName: { startsWith: query, mode: "insensitive" } },
  });
}

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id: id } });
}

export async function createEmptyUser(): Promise<User> {
  return await prisma.user.create({ data: {} });
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  return await prisma.user.update({ where: { id: id }, data });
}

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({ where: { id: id } });
}
