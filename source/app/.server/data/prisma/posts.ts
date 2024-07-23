import type { Post } from "@prisma/client";
import { prisma } from "./prisma";

export async function getUserPosts(id: number): Promise<Post[]> {
  return await prisma.post.findMany({ where: { userId: id } });
}
