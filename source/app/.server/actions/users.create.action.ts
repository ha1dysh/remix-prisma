import { redirect } from "@remix-run/react";
import { createEmptyUser } from "~/.server/data/prisma/users";


export const userCreateAction = async () => {
  const user = await createEmptyUser();
  return redirect(`/users/${user.id}/edit`);
};
