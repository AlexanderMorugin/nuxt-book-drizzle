<template>
  <Users />

  <AuthRegister />
  <AuthLogout />
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
