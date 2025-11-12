export default defineNuxtRouteMiddleware(async (to, from) => {
  // const userStore = useUserStore();
  const cookie = useCookie("email");

  console.log("RouteMiddleware-middleware: ", cookie.value);

  if (!cookie.value) {
    return navigateTo("/login");
  }

  // await userStore.findUserByEmail(cookie);

  // console.log(session);
  // return session;
});
