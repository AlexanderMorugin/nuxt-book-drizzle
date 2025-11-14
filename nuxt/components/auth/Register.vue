<template>
  <div>
    <h2>Регистрация</h2>

    <form class="form" @submit.prevent="submitRegister">
      <input
        type="text"
        name="name"
        v-model="formData.name"
        placeholder="Name"
      />
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
      <input
        type="password"
        name="confirmPassword"
        v-model="formData.confirmPassword"
        placeholder="confirmPassword"
      />
      <button type="submit">Создать</button>
    </form>
    <div v-if="registerMessage">registerMessage: {{ registerMessage }}</div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const formData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  book_for_years: 10,
});

const registerMessage = ref(null);

const submitRegister = async () => {
  const { data, status } = await userStore.createUser(formData);

  if (status.value === "error") {
    registerMessage.value = "Пользователь с такой почтой уже существует.";
  }

  if (status.value === "success") {
    registerMessage.value = "Регистрация прошла успешно!";
    navigateTo(`/login`);
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
