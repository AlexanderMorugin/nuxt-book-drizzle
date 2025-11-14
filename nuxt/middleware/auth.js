// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const userStore = useUserStore();

//   const res = await useFetch("/api/auth/session");

//   userStore.setCurrentUser(res.data.value[0]);
// });

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  const cookie = useCookie("refresh_token");

  if (!cookie.value) {
    return navigateTo("/login");
  }

  const { data, status, error } = await useFetch("/api/auth/session");

  userStore.setCurrentUser(data.value[0]);
});
