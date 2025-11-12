<template>
  <div>
    <h2>Логин</h2>
    <div>Пользователь : {{ userStore.user }}</div>
    <form class="form" @submit.prevent="submitLogin">
      <input
        type="email"
        name="email"
        v-model="formData.email"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        v-model="formData.password"
        placeholder="Password"
      />
      <button type="submit">Войти</button>
    </form>
    <div>formData: {{ formData }}</div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const formData = ref({
  email: "",
  password: "",
});

const submitLogin = async () => {
  const data = await userStore.loginUser(formData);

  console.log("submitLogin: ", data.value[0]);

  if (data) {
    return navigateTo("/");
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  padding: 40px;
}
</style>
