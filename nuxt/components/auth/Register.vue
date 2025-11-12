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
      <button type="submit">Создать</button>
    </form>
    <div>formData: {{ formData }}</div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const submitRegister = async () => {
  const res = await userStore.createUser(formData);

  console.log("submitRegister", res);
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
