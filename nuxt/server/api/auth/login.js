import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Users } from "~/server/database/schema";
import { comparePassword } from "~/server/utils/hash-password";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Проверяем в БД есть ли пользователь с такой почтой
  const existUser = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .limit(1);

  // Если пользователь с такой почтой существует: Выбрасываем ошибку на стороне сервере
  if (!existUser) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль неверные.",
    });
  }

  // Сверяем пароль
  const doesThePasswordMatch = comparePassword(password, existUser[0].password);

  // Если пароли не совпадают: Выбрасываем ошибку на стороне сервере
  if (!doesThePasswordMatch) {
    return createError({
      statusCode: 401,
      message: "Имя пользователя или пароль неверные.",
    });
  }

  // Генерируем два токена для пользователя
  // accessToken передаем на устройство пользователя
  // refreshToken сохраняем в БД на сервере
  const { accessToken, refreshToken } = generateTokens(existUser[0]);

  // Записываем в куки accessToken
  // sendRefreshTokenToCookie(refreshToken);
  setCookie(
    event,
    "refresh_token",
    refreshToken
    //    {
    //   httpOnly: true,
    //   sameSite: true,
    // }
  );

  // Записываем в Database refreshToken
  await db
    .update(Users)
    .set({ refresh_token: refreshToken })
    .where(eq(Users.email, email));

  return existUser;
});
