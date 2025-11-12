import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const users = ref([]);
  const user = ref(null);

  const loadUsers = async () => {
    const res = await useFetch("/api/users");

    users.value = res.data.value;
  };

  const createUser = async (fromData) => {
    const { data, status, error } = await useFetch("/api/auth/register", {
      method: "POST",
      body: fromData.value,
    });

    console.log("STORE-status: ", status.value);
    console.log("STORE-error: ", error.value);

    return data;
  };

  const loginUser = async (fromData) => {
    const { data, status, error } = await useFetch("/api/auth/login", {
      method: "POST",
      body: fromData.value,
    });

    console.log("STORE-status: ", status.value);
    console.log("STORE-error: ", error.value);
    console.log("STORE-data: ", data.value[0]);

    user.value = data.value[0];

    return data;
  };

  const logoutUser = async () => {
    const { status, error } = await useFetch("/api/auth/logout");

    console.log("STORE-status: ", status.value);
    // console.log("STORE-error: ", error.value);
    // console.log("STORE-data: ", data.value[0]);

    // user.value = data.value[0];

    // return data;
  };

  return { users, user, loadUsers, createUser, loginUser, logoutUser };
});
