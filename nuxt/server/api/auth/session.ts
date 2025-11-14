import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refresh_token");

  const existUser = await db
    .select()
    .from(Users)
    .where(eq(Users.refresh_token, cookie))
    .limit(1);

  return existUser;
});
