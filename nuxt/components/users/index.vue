<template>
  <div>Пользователь : {{ userStore.user }}</div>
  <h1>Users</h1>
  <div v-for="user in userStore.users" :key="user.id">{{ user }}</div>
</template>

<script setup>
const userStore = useUserStore();

await userStore.loadUsers();
</script>
