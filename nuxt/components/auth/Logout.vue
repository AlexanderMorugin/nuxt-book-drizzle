<template>
  <div>
    <h2>Логаут</h2>

    <button type="button" @click="logout">Выйти</button>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const logout = () => {
  const cookie = useCookie("refresh_token");
  cookie.value = null;
  userStore.logoutCurrentUser();
  location.reload();
  return navigateTo("/login");
};
// };
</script>
