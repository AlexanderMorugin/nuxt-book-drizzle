import { eq } from "drizzle-orm";
import { navigateTo } from "nuxt/app";
// import { navigateTo, useCookie } from "nuxt/app";
import { db } from "~/server";
import { Users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, "refresh_token");

  if (!cookie) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        message: "Refresh token не найден.",
      })
    );
  }

  const existUser = await db
    .select()
    .from(Users)
    .where(eq(Users.refresh_token, cookie))
    .limit(1);

  // Проверяем действительность рефреш токена
  const rToken = await decodeRefreshToken(existUser[0].refresh_token);

  console.log(rToken);

  // Если рефреш истек, возвращаем ноль вместо пользователя
  // Далее идем на логин и получаем новый рефреш
  if (!rToken) {
    return null;
  }

  return existUser;
});
