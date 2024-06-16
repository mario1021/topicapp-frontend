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
    { title: "Sentimiento", data: "sentiment", className: "text-center"},
    { title: "Número de menciones", data: "total_mentions", className: "text-center"},
    { title: "", data: null, orderable:false, className:"justify-content-center", render: (data, type, row) => `
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
           <ul class="dropdown-menu">
            <li><a class="dropdown-item view-detail" href="#" data-id="${row.id}">Ver Detalle</a></li>
            <li><a class="dropdown-item delete-topic" href="#" data-id="${row.id}">Borrar</a></li>
          </ul>
        </div>
      ` }
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

const viewDetail = (id) => {
  router.push({ name: 'topic', params: { id } });
};

const deleteTopic = async (id) => {
  await topicStore.deleteTopic(id);
  await getTopics();
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
  createdRow: (row, data, dataIndex) => {
    const viewDetailBtn = row.querySelector('.view-detail');
    const deleteTopicBtn = row.querySelector('.delete-topic');

    viewDetailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewDetail(data.id);
    });

    deleteTopicBtn.addEventListener('click', (e) => {
      e.preventDefault();
      deleteTopic(data.id);
    });
  }
};
</script>

<template>
  <HeaderBar :select="'topic'" />

  <div>
    <div class="card mt-3 mx-2">
      <div class="card-header">
      <div class="d-flex justify-content-between align-items-center me-3 mb-3 mt-3">
        <h5>Tópicos</h5>
        <button class="btn btn-primary me-2" @click="showCreateModal = true">Crear nuevo tópico</button>
      </div>
    </div>

    <div class="card-body">

      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <DataTable :data="state.topics" :columns="state.cols" :options="options" class="table table-hover table-striped" />
          </div>
        </div>
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
    background-color: #c997f9 !important;
    color: white !important;
}

.btn-secondary{
  background-color: #BF82F8 !important;
  border-color: #BF82F8;
}

.dropdown-toggle::after{
  margin-left: 0% !important;
}

</style>