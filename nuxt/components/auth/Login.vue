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
    <div v-if="loginMessage">loginMessage: {{ loginMessage }}</div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const formData = ref({
  email: "",
  password: "",
});

const loginMessage = ref(null);

const submitLogin = async () => {
  // const { data, status } = await userStore.loginUser(formData);
  const { data, status, error } = await useFetch("/api/auth/login", {
    method: "POST",
    body: formData.value,
  });

  // console.log(data.value[0]);
  // console.log(status.value);

  if (status.value === "error") {
    loginMessage.value = "Имя пользователя или пароль неверные.";
  }

  if (status.value === "success") {
    loginMessage.value = "Авторизация прошла успешно!";
    userStore.setCurrentUser(data.value[0]);

    return navigateTo("/");
    // return navigateTo(`/${data.value[0].id}`);
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
