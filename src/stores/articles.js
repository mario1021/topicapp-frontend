import axiosApi from "@/services/axios/axiosConfig.js";
import { defineStore } from "pinia";

export const useArticleStore = defineStore({
    id: "articles",
    actions: {
        async getArticles() {
        return axiosApi.get("articles")
        },
        async getArticlesFiltered(data) {
        return axiosApi.get("articles/filter", { params: data })
        },
        async getArticle(id) {
        return axiosApi.get(`articles/${id}`)
        },
        async getSources() {
        return axiosApi.get("sources")
        }
    }

});
       