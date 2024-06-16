<template>
    <HeaderBar :select="'topic'" />

    <div>
        <div class="card mt-3 mx-2">
            <div class="card-header">
            <div class="d-flex justify-content-start align-items-center me-3 mb-3 mt-3">
                <h5>{{state.topic?.title}}</h5>
            </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <!--first we show the topic fields in inputs not editable. let´s show like 2 per row (1 if small screen) We have total_mentions, trend, sentiment, and then 3 small ones that we wanna show togetter, pos_score, neg_score, neu_score-->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="total_mentions">Menciones totales</label>
                                    <input type="text" class="form-control" id="total_mentions" :value="state.topic ? state.topic.total_mentions : 'Cargando...'"
                                     disabled>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="trend">Tendencia</label>
                                    <input type="text" class="form-control" id="trend" :value="state.topic ? state.topic.trend : 'Cargando...'"
                                     disabled> 
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="sentiment">Sentimiento promedio</label>
                                    <input type="text" class="form-control" id="sentiment" :value="state.topic ? state.topic.sentiment : 'Cargando...'"
                                     disabled>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                <label for="pos_score">Score positivo</label>
                                <input type="text" class="form-control" id="pos_score" :value="state.topic ? state.topic.pos_score : 'Cargando...'"
                                 disabled>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                <label for="neu_score">Score neutro</label>
                                <input type="text" class="form-control" id="neu_score" :value="state.topic ? state.topic.neu_score : 'Cargando...'"
                                 disabled>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                <label for="neg_score">Score negativo</label>
                                <input type="text" class="form-control" id="neg_score" :value="state.topic ? state.topic.neg_score : 'Cargando...'"
                                 disabled>
                                </div>
                            </div>
                </div>

                    <!-- first the dates filter for the mentions we receive-->
                    <div class="container mt-3">
                        <div class="row justify-content-center">
                            <h6 style="width: auto;">Gráfica de menciones</h6>
                        </div>

                        <div class="row justify-content-around">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="start_date">Fecha de inicio</label>
                                    <input type="date" class="form-control" id="start_date" v-model="state.start_date">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="end_date">Fecha de fin</label>
                                    <input type="date" class="form-control" id="end_date" v-model="state.end_date">
                                </div>
                            </div>
                        </div>
                        <LineGraphComponent :mentions="state.mentions" />
                    </div>
                    <!-- then the chart -->
                </div>

            </div>
        </div>

</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useTopicStore } from "@/stores/topics";
import { useRouter } from "vue-router";
import CreateTopicComponent from "@/components/CreateTopicComponent.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import LineGraphComponent from "@/components/LineGraphComponent.vue";

const props=defineProps({
  id: {
    type: String
    ,
    required: true
  }
})

const topicStore = useTopicStore();
const router = useRouter();

const state = reactive({
  topic: null,
  mentions:[],
  start_date: null,
  end_date: null,
});

const getTopic = async () => {
  const topic = await topicStore.getTopic(props.id);
  state.topic = topic.data;
};

const getMentionsFiltered = async () => {
  let params = {
    topic_id: props.id,
    start_date: state.start_date,
    end_date: state.end_date
  }
    const mentions = await topicStore.getMentionsFiltered(params);
    state.mentions = mentions.data;
};

onMounted(() => {
  getTopic();
  getMentionsFiltered();
});

//a watch for the start_date and end_date to update the mentions when they change
watch([() => state.start_date, () => state.end_date], () => {
  getMentionsFiltered();
});


</script>

