import { PrismaClient } from "@prisma/client";

import { seedUsers } from "./seed/seed.users";
import { seedPosts } from "./seed/seed.posts";

export const prisma = new PrismaClient();

async function dataSeed() {
  const amountOfDataObjects = 30;
  const chunkLimit = 10;

  await seedUsers(amountOfDataObjects, chunkLimit);
  await seedPosts(amountOfDataObjects, chunkLimit);
}

dataSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.log("seed failed", error);
    process.exit(1);
  });
