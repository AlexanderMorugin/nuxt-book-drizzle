import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  const userForRegister = {
    name: name,
    email: email,
    password: password,
  };

  const createdUser = await db.insert(Users).values({ ...userForRegister });

  return createdUser;
});
