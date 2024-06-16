<script setup>
import { reactive, ref, onMounted} from "vue";
import { useTopicStore } from "@/stores/topics";
import { useRouter } from "vue-router";
import CreateTopicComponent from "@/components/CreateTopicComponent.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetShow,
  DatasetSearch,
} from "vue-dataset";

const topicStore = useTopicStore();
const router = useRouter();

const state = reactive({
  topics: [],
  cols: [
    { name: "Nombre", field: "title", sort: "asc" },
    { name: "Sentimiento", field: "sentiment", sort: "" },
    { name: "Número de menciones", field: "total_mentions", sort: "" },
  ],
});
const filters = reactive({
  search: ''
});

const showCreateModal = ref(false);

const getTopics = async () => {
    const res = await topicStore.getTopics()
    state.topics = res.data;
};

onMounted(async () => {
  await getTopics();
  console.log(state.topics);
});

const createTopic = async (title) => {
  await topicStore.createTopic(title);
  await getTopics();
  showCreateModal.value = false;
};

</script>

<template>
    <HeaderBar :select="'topic'" />
    <div class="d-flex justify-content-between align-items-center mb-3 mt-3">
      <dataset-search ds-search-placeholder="Buscar..." class=" mx-3" style="width: 50%;" />
      <button class="btn btn-primary me-2" @click="showCreateModal = true">Crear nuevo tópico</button>
    </div>

    <div>
      <dataset
        v-slot="{ ds }"
        :ds-data="state.topics"
        :ds-sortby="['title']"
        :ds-search-in="['title', 'sentiment', 'total_mentions']"
        :ds-text="{ showing: 'Mostrando {0} a {1} de {2} entradas', next: 'Siguiente página', prev: 'Página anterior' }"
      >
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped d-md-table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th v-for="(th, index) in state.cols" :key="th.field" :class="['sort', th.sort]">
                      {{ th.name }}
                    </th>
                  </tr>
                </thead>
                <dataset-item tag="tbody">
                  <template #default="{ row, rowIndex }">
                    <tr>
                      <th scope="row">{{ rowIndex + 1 }}</th>
                      <td>{{ row.title }}</td>
                      <td>{{ row.sentiment }}</td>
                      <td>{{ row.total_mentions }}</td>
                    </tr>
                  </template>
                </dataset-item>
              </table>
            </div>
          </div>
        </div>
        <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <dataset-info class="mb-2 mb-md-0" />
          <dataset-pager />
        </div>
      </dataset>
    </div>

    <CreateTopicComponent :show="showCreateModal" @close="showCreateModal = false" @submit="createTopic" />
</template>

<style>
@import "vue-select/dist/vue-select.css";
</style>