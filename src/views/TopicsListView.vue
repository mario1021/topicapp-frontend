<script setup>
import { reactive, ref, onMounted } from "vue";
import { useTopicStore } from "@/stores/topics";
import { useRouter } from "vue-router";
import CreateTopicComponent from "@/components/CreateTopicComponent.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5';
DataTable.use(DataTablesCore);

const topicStore = useTopicStore();
const router = useRouter();

const state = reactive({
  topics: [],
  cols: [
    { title: "#", data: null, render: (data, type, row, meta) => meta.row + 1 },
    { title: "Nombre", data: "title" },
    { title: "Sentimiento", data: "sentiment" },
    { title: "Número de menciones", data: "total_mentions" },
  ],
});

const showCreateModal = ref(false);
const search = ref('');

const getTopics = async () => {
    const res = await topicStore.getTopics();
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

const options = {
  language: {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Último",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  },
  paging: true,
  searching: true,
  responsive: true,
};
</script>

<template>
  <HeaderBar :select="'topic'" />

  <div>
    <div class="d-flex justify-content-end align-items-center me-3 mb-3 mt-3">
      <button class="btn btn-primary me-2" @click="showCreateModal = true">Crear nuevo tópico</button>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <DataTable :data="state.topics" :columns="state.cols" :options="options" class="table table-hover table-striped" />
        </div>
      </div>
    </div>
  </div>

  <CreateTopicComponent :show="showCreateModal" @close="showCreateModal = false" @submit="createTopic" />
</template>

<style>
@import "@/assets/main.css";
@import 'datatables.net-bs5';
.table-responsive {
  margin-left: 2%;
    margin-right: 2%;
}

.btn-primary {
  background-color: #9227EC !important;
  border-color: #BF82F8;
}

.table-striped thead {
    background-color: #BF82F8;
}

.page-item.active .page-link {
    background-color: #BF82F8;
    border: 0px solid #9227EC;
}
.page-link {
    color: black !important;
}

table thead th {
    border: 0px solid white;
    background-color: #F2E7FE !important;

}

</style>