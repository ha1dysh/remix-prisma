import { prisma } from "../seed";
import { User } from "@prisma/client";
import { DummyUser, getUrl } from "~/.server/data/dummyjson";

const fetchUsers = async (limit: number, skip = 0): Promise<DummyUser[]> => {
  const usersUrl = getUrl("users");
  usersUrl.searchParams.append("limit", String(limit));
  usersUrl.searchParams.append("skip", String(skip));

  try {
    const res = await fetch(usersUrl.href);
    const { users } = await res.json();
    return users;
  } catch (error) {
    console.log('Failed to fetch users', error);
    return [];
  }
};

export async function seedUsers(dataAmount: number, limit: number) {
  const users: User[] = [];

  for (let offset = 0; offset < dataAmount; offset += limit) {
    const fetchLimit = Math.min(limit, dataAmount - offset);
    const dummyUsers = await fetchUsers(fetchLimit, offset);
    users.push(...transformUser(dummyUsers));
  }

  await prisma.user.createMany({ data: users });
  console.log("Seed Users completed.");
}

function transformUser(user: DummyUser[]): User[] {
  return user.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      image: user.image,
      email: user.email,
      favorite: false,
      country: user.address.country,
      city: user.address.city,
      address: user.address.address,
    };
  });
}
