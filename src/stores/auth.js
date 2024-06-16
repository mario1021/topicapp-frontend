import { defineStore } from 'pinia';
import axiosApi from "@/services/axios/axiosConfig.js";

let timer;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      try {
        const response = await axiosApi.post('/login', { username, password });
        this.setToken(response.data.access_token);
        timer = setTimeout(() => {
          this.logout();
        }, 43200000); // 12 hours
      } catch (error) {
        return Promise.reject(error);
      }
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
      clearTimeout(timer);
    },

    async autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        timer = setTimeout(() => {
          this.logout();
        }, 43200000);
      }
    },

    setToken(response) {
      this.token = response;
      localStorage.setItem("token", this.token);
    },

    async signUp(username, password, full_name) {
      return axiosApi.post('signup', {
        username: username,
        password: password,
        full_name: full_name
      });
    }
  }
});
