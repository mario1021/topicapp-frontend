import axiosApi from "@/services/axios/axiosConfig.js";
import { defineStore } from "pinia";

export const useTopicStore = defineStore({
    id: "topics",
    actions: {
        async getTopics() {
        return axiosApi.get("topics")
        },
        async getTopic(id) {
        return axiosApi.get(`topics/${id}`)
        },
        async createTopic(title) {
        return axiosApi.post("topics", { title: title });
        },
        async updateTopic(id, title) {
        return axiosApi.put(`topics/${id}`, { title: title });
        },
        async deleteTopic(id) {
        return axiosApi.delete(`topics/${id}`);
        },
    },
    });