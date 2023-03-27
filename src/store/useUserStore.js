// import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => {
    const user = useLocalStorage("user", {});
    const isAuthenticated = useLocalStorage("isAuthenticated", false);
    return { user, isAuthenticated };
  },
  actions: {
    login(data) {
      this.user = data;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
  },
});
