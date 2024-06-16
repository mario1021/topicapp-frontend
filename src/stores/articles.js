import axiosApi from "@/services/axios/axiosConfig.js";
import { defineStore } from "pinia";

export const useTopicStore = defineStore({
    id: "articles",
    state: () => ({
        topics: [],
        topic: null
    }),
    actions: {
        async getArticles() {
        return axiosApi.get("articles").then((response) => {
            this.topics = response.data;
        });
        },
        async getArticlesFiltered(data) {
        return axiosApi.get("articles", { params: data }).then((response) => {
            this.topics = response.data;
        });
        },
        async getArticle(id) {
        return axiosApi.get(`articles/${id}`).then((response) => {
            this.topic = response.data;
        });
        }
    },

});
       