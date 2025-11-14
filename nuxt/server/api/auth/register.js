import { eq } from "drizzle-orm";
import { db } from "~/server";
import { Users } from "~/server/database/schema";
// import { hashPassword } from "~/server/utils/hash-password";

export default defineEventHandler(async (event) => {
  const { name, email, password, book_for_years } = await readBody(event);

  // Проверяем в БД есть ли пользователь с такой почтой
  const existUser = (
    await db
      .select()
      .from(Users)
      .where(eq(Users.email, email))
      .limit(1)
      .execute()
  )[0];

  // Если пользователь с такой почтой существует: Выбрасываем ошибку на стороне сервере
  if (existUser) {
    return createError({
      statusCode: 401,
      message: "Пользователь с такой почтой уже существует.",
    });
  }

  // Хешируем пароль
  const hashUserPassword = hashPassword(password);

  // Собираем пользователя
  const userForRegister = {
    name: name,
    email: email,
    password: hashUserPassword,
    book_for_years: book_for_years,
  };

  // Отправляем пользователя в базу данных
  const createdUser = await db.insert(Users).values({ ...userForRegister });

  // console.log("API_REGISTER: ", createdUser);

  return createdUser;
});
