import { defineStore } from "pinia";
import httpClient from "../httpClient";

const initState = { isAuthenticated: false, user: null, isLoading: true };

export const useAuthStore = defineStore("auth", {
  state: () => initState,

  actions: {
    setUser(data) {
      this.user = data;
      this.isAuthenticated = true;
      this.isLoading = false;
    },

    resetAuth() {
      this.$state = { ...initState, isLoading: false };
    },

    async getUserInfo() {
      try {
        const { data } = await httpClient.get("/api/auth/info");
        this.setUser(data);
        return true;
      } catch (error) {
        console.log(error);
        this.resetAuth();
        return false;
      }
    },
  },
});
