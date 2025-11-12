import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const existUser = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .limit(1);

  setCookie(event, "email", email);
  // deleteCookie(event, "email");

  return existUser;
});
