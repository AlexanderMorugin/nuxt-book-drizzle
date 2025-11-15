// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const userStore = useUserStore();

//   const res = await useFetch("/api/auth/session");

//   userStore.setCurrentUser(res.data.value[0]);
// });

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const cookie = useCookie("refresh_token");

  const { data, status, error } = await useFetch("/api/auth/session");

  // Если срок годности рефреш токена истек, отправляем на логин
  if (!data.value) {
    userStore.logoutCurrentUser();
    cookie.value = null;
    return navigateTo("/login");
  }

  userStore.setCurrentUser(data.value[0]);
});
