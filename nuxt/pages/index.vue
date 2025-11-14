<template>
  <Users />
  <AuthLogout />
  <ul>
    <li>
      <NuxtLink to="/register">Регистрация</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/login">Логин</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
