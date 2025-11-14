import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id: userId } = await readBody(event);

  const deletedUser = await db.delete(Users).where(eq(Users.id, userId));

  deleteCookie(event, "refresh_token");
  // .execute();
  // .returning();

  // console.log("API_DELETE_USER: ", deletedUser);

  // return deletedUser;
});
