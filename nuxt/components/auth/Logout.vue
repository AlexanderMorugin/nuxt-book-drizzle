<template>
  <div>
    <h2>Логаут</h2>

    <button type="button" @click="logout">Выйти</button>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const logout = async () => {
  await userStore.logoutUser();

  navigateTo("/login");
};
</script>
