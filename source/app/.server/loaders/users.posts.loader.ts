import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserPosts } from "~/.server/data/prisma/posts";

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const posts = await getUserPosts(Number(params.userId));
  if (!posts) {
    throw new Response("Posts Not Found", { status: 404 });
  }
  return { posts };
};
