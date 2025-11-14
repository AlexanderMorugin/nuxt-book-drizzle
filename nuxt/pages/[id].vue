<template>
  <div v-if="userStore.user" class="item">
    <div>id: {{ userStore.user.id }}</div>
    <div>name: {{ userStore.user.name }}</div>
    <div>email: {{ userStore.user.email }}</div>
    <div>password: {{ userStore.user.password }}</div>
    <div>book_for_years: {{ userStore.user.book_for_years }}</div>
    <div>refresh_token: {{ userStore.user.refresh_token }}</div>
    <div class="buttons">
      <button @click="deleteUser(userStore.user.id)">Удалить</button>
      <AuthLogout />
    </div>
  </div>

  {{ route.params }}
  <ul>
    <li>
      <NuxtLink to="/">Главная</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/register">Регистрация</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/login">Логин</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
// definePageMeta({
//   middleware: ["auth"],
// });

const route = useRoute();

const userStore = useUserStore();

// await userStore.user;
//
// if (route.params !== userStore.user.id) {
//   navigateTo("/login");
// }
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 700px;
  border: 1px solid blue;
  border-radius: 10px;
  font-size: 18px;
  padding: 20px;
}
.buttons {
  display: flex;
  gap: 30px;
}
</style>
