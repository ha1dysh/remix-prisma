import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { updateUser } from "~/.server/data/prisma/users";

export const userUpdateAction = async ({ params, request }: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const userUpdates = {...updates, age: Number(updates.age)}
  await updateUser(Number(params.userId), userUpdates);

  return redirect(`/users/${params.userId}/info`);
};
