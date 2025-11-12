import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const result = await db.select().from(Users);

  // const cookie = getCookie(event, "email");

  // console.log("cookie: ", cookie);

  return result;
});
