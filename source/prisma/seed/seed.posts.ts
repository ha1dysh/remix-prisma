import { prisma } from "../seed";
import { Post } from "@prisma/client";
import { DummyPosts, getUrl } from "~/.server/data/dummyjson";

const fetchPosts = async (userId: number): Promise<DummyPosts> => {
  try {
    const usersUrl = getUrl(`users/${userId}/posts`);
    const res = await fetch(usersUrl.href);
    return await res.json();
  } catch (error) {
    console.log('Failed to fetch posts', error);
    return { posts: [] };
  }
};

export async function seedPosts(dataAmount: number, limit: number) {
  const posts: Post[] = [];

  for (let offset = 1; offset < dataAmount; offset += limit) {
    const fetchLimit = Math.min(limit, dataAmount - offset);
    const promises = Array.from({ length: fetchLimit }, (_, i) => fetchPosts(offset + i));
    const ArrayOfDummyPosts = await Promise.all(promises);
    posts.push(...ArrayOfDummyPosts.flatMap((transformPosts)))
  }

  await prisma.post.createMany({ data: posts });
  console.log("Seed Posts completed.");
}

function transformPosts({ posts }: DummyPosts): Post[] {
  return posts.map((post) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      tags: post.tags,
      userId: post.userId,
      likes: post.reactions.likes,
      dislikes: post.reactions.dislikes,
    };
  });
}
