<template>
    <section class="vh-100 d-flex align-items-center justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-4">
        <div class="card card-custom text-black">
          <div class="card-header card-header-custom text-center">
            <h2 class="fw-bold mb-0">Login</h2>
          </div>
          <div class="card-body p-5">
            <form @submit.prevent="onSubmit">
              <div class="mb-4">
                <label class="form-label" for="username">Nombre de usuario</label>
                <input type="text" id="username" class="form-control form-control-lg" v-model="state.username" />
              </div>
  
              <div class="mb-4">
                <label class="form-label" for="password">Contraseña</label>
                <input type="password" id="password" class="form-control form-control-lg" v-model="state.password" />
              </div>
  
              <div class="d-flex justify-content-center">
                <button class="btn btn-custom btn-lg px-5" type="submit">Iniciar sesión</button>
              </div>
  
              <p class="mt-3 text-center">¿No tienes cuenta? <router-link to="/signup" class="redirect fw-bold">Registrarse</router-link></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useAuthStore } from "@/stores/auth";
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const state = reactive({
    username: null,
    password: null,
  });
  
  async function onSubmit() {
    if (state.username != null && state.password != null) {
      await authStore.login(state.username, state.password);
      if (localStorage.getItem("token") != null) {
        router.push({ name: "topics" });
      }
    }
  }
  </script>

  <style>
  @import '@/assets/main.css';
  </style>
  
