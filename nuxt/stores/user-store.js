import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const users = ref([]);
  const user = ref(null);

  const loadUsers = async () => {
    const res = await useFetch("/api/users");

    users.value = res.data.value;
  };

  const createUser = async (userData) => {
    const { data, status, error } = await useFetch("/api/auth/register", {
      method: "POST",
      body: userData.value,
    });

    return { data, status, error };
  };

  // const loginUser = async (userData) => {
  //   const { data, status, error } = await useFetch("/api/auth/login", {
  //     method: "POST",
  //     body: userData.value,
  //   });

  //   return { data, status, error };
  // };

  // const logoutUser = async () => {
  //   user.value = null;

  //   const { data, status, error } = await useFetch("/api/auth/logout");

  //   return { data, status, error };
  // };

  const setCurrentUser = (userData) => {
    user.value = userData;
  };

  const logoutCurrentUser = () => {
    user.value = null;
  };

  const deleteDatabaseUser = async (userId) => {
    const { data, status, refresh } = await useFetch("/api/auth/delete", {
      method: "DELETE",
      body: {
        id: userId,
      },
    });

    users.value = users.value.filter((user) => user.id !== userId);

    return { data, status, refresh };
  };

  return {
    users,
    user,
    loadUsers,
    createUser,
    // loginUser,
    // logoutUser,
    setCurrentUser,
    logoutCurrentUser,
    deleteDatabaseUser,
  };
});
