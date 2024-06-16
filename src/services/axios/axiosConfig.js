import validation from "@/services/response/validation";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { POSITION, useToast } from "vue-toastification";

const toast = useToast({
  position: POSITION.BOTTOM_RIGHT,
});

const axiosApi = axios.create({
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: 'http://localhost:5000',
});

axiosApi.interceptors.request.use(
  // Do something before request is sent
  function (config) {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  // Do something with request error
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  function (response) {
    if (response.data.message) {
      console.log(response.data.message)
      toast.success(response.data.message, { timeout: 2000 });
    } else if (response.config.method === "post" || response.config.method === "put" || response.config.method === "delete") {
      toast.success("Operación realizada con éxito", { timeout: 2000 });
    } else {
      console.log("Operación realizada con éxito")
    }
    return response;
  },
  // Any Error or any status codes that falls outside the range of 2xx cause this function to trigger
  function (error) {
    // The request was made and the server responded with a status code that falls out of the range of 2xx
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status === 403) {
        toast.error("Acceso denegado");
      }
      if (validation.hasValidationErrors(error)) {
        console.log("Validation error");
      } else {
        toast.error(
          error.response.data && error.response.data.message
            ? error.response.data.message
            : "Ha ocurrido un error"
        );
      }
    } else if (error.request) { // The request was made but no response was received
      console.log("No se ha recibido respuesta", error.request);
      toast.error("No se ha recibido respuesta");
    } else { // Something happened in setting up the request that triggered an Error
      console.log("Error en la petición", error.message);
      toast.error("Error en la petición");
    }
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default axiosApi;
