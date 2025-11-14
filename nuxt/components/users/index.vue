<template>
  <div>
    <div v-if="userStore.user">Пользователь : {{ userStore.user }}</div>
    <h1>Users</h1>
    <div class="list">
      <div v-for="user in userStore.users" :key="user.id" class="item">
        <div>id: {{ user.id }}</div>
        <div>name: {{ user.name }}</div>
        <div>email: {{ user.email }}</div>
        <div>password: {{ user.password }}</div>
        <div>book_for_years: {{ user.book_for_years }}</div>
        <div>refresh_token: {{ user.refresh_token }}</div>
        <div>
          <button @click="deleteUser(user.id)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userStore = useUserStore();

await userStore.loadUsers();

const deleteUser = async (userId) => {
  await userStore.deleteDatabaseUser(userId);
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
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
</style>
