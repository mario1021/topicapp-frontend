<template>
    <div>
      <Line v-if="loaded":data="state" :options="options" :plugins="plugins"></Line>
    </div>
  </template>
  
<script setup>
  import { defineComponent, ref, reactive, watch, } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler
  } from 'chart.js'
  import 'chartjs-adapter-moment';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    Filler)
  
  const props=defineProps( {
      mentions: {
        type: Array,
        required: true
      }
    });

  var pointBackgroundColors= [];

  //loaded to check if the data is loaded
  var loaded = ref(false);



  const state =reactive({

    datasets: [
      {
        label: 'Menciones por día',
        data: props.mentions.map((mention) => {
          return { x: new Date(mention.day_date).toISOString().split('T')[0], y: mention.amount };
        }),
        pointBackgroundColor: props.mentions.map((mention) => {
          if (mention.sentiment === 'POS') {
            return 'green';
          } else if (mention.sentiment === 'NEG') {
            return 'red';
          } else {
            return 'blue';
          }
        }),
        borderWidth: 1,
        fill: true,
      }
    ]

  });

  const options = ref({
    scales: {
      xAxes: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            callbacks: {
                footer: function (tooltipItems) {
                    return 'POS score: ' + props.mentions[tooltipItems[0].dataIndex].pos_score + ' | NEG score: ' + props.mentions[tooltipItems[0].dataIndex].neg_score
                    + ' | NEU score: ' + props.mentions[tooltipItems[0].dataIndex].neu_score;
                }
            }
        }
    }
  });


    watch(() => props.mentions, (newVal, oldVal) => {
        loaded.value = false;
        //lets wait so the chart for sure is loaded
        setTimeout(() => {
        }, 1000);
        state.datasets[0].data = newVal.map((mention) => {
        return { x: new Date(mention.day_date).toISOString().split('T')[0], y: mention.amount };
        });
        state.datasets[0].pointBackgroundColor = newVal.map((mention) => {
        if (mention.sentiment === 'POS') {
            return 'green';
        } else if (mention.sentiment === 'NEG') {
            return 'red';
        } else {
            return 'blue';
        }
        });
        loaded.value = true;
    });


</script>