    <script setup>
  import { reactive, ref, onMounted, watch } from "vue";
  import { useTopicStore } from "@/stores/topics";
  import { useArticleStore } from "@/stores/articles";
  import { useRouter } from "vue-router";
  import HeaderBar from "@/components/HeaderBar.vue";
  
  const topicStore = useTopicStore();
  const articleStore = useArticleStore();
  const router = useRouter();
  
  const state = reactive({
    articles: [],
    topics: [],
    sources: [],
    selectedTopic: null,
    selectedArticle: null,
    topicFilter: null,
    articleFilter: {
      source_id: null,
      start_date: null,
      end_date: null
    },
  });
  
  const minimized = ref(false);
  
  const getArticles = async () => {
    const params = {
      source_id: state.articleFilter.source_id,
      start_date: state.articleFilter.start_date,
      end_date: state.articleFilter.end_date,
      topic_id: state.selectedTopic.id,
    };
    let articles = await articleStore.getArticlesFiltered(params);
    articles=articles.data;
     //let´s map the articles so article.content gets its \n replaced by <br> so it is shown correctly in the view
    articles = articles.map(article => ({ ...article, content: article.content.replace(/(\r\n|\r|\n)/g, '<br><br>')}));
    state.articles = articles.map(article => ({ ...article, showContent: false }));
    console.log(state.articles);
    
  };
  
  const getTopicsFiltered = async () => {
    const filter = { title: state.topicFilter };
    state.topics = await topicStore.getTopicsFiltered(filter);
    state.topics= state.topics.data;
  };
  
  const getSources = async () => {
    const sources = await articleStore.getSources();
    state.sources = sources.data;
  };
  
  const selectTopic = (topic) => {
    state.selectedTopic = topic;
  };
  
  const toggleArticle = (id) => {
    const article = state.articles.find(article => article.id === id);
    if (article) {
      article.showContent = !article.showContent;
    }
  };

  
  onMounted(() => {
    getTopicsFiltered();
    getSources();
  });
  
  watch(() => state.topicFilter, () => {
    getTopicsFiltered();
  });
  
  watch(() => state.articleFilter, () => {
    getArticles();

  }, { deep: true});
  
  watch(() => state.selectedTopic, () => {
    if (state.selectedTopic) {
      getArticles();
    } else {
      state.articles = [];
    }
  });

  const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
    };  
  </script>

<template>
    <!--hEADER-->
    <HeaderBar :select="'article'" />

    <!--Main content: on the left we want a vertical navbar, collapsable with a button with fa-bars. On the vertical navbar, the list of topics is shown. there is a filter for the topic title.
    We show the topic on rows showing the title. When a row is clicked, it gets selected (it should be visible that it is the selected one).
    That is all for the navBar. Now on the content of the page: if no topic is selected, just a text saying, choose the topic of the articles you want to see. 
    When a topic is selected, the list of articles and the other article filters appear. The articles are shown in bootstrap cards, with the article.title on the header and article.content on the body with a button for article.url-->

    <div class="container-fluid">
        <div class="row mt-3 mx-1">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        <h5>Tópicos</h5>
                    </div>
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Filtrar por nombre" v-model="state.topicFilter">
                        </div>
                        <div class="list-group">
                            <a v-for="topic in state.topics" :key="topic.id" @click="selectTopic(topic)" class="list-group-item list-group-item-action" :class="{ active: state.selectedTopic && state.selectedTopic.id === topic.id }">
                                {{ topic.title }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div v-if="state.selectedTopic">
                    <div class="card">
                        <div class="card-header">
                            <h5>Noticias</h5>
                        </div>
                        <div class="card-body">
                            <div class="filters">
                                <div class="input-group mb-3">
                                    <select class="form-select" v-model="state.articleFilter.source_id">
                                        <option :value=null>Filtrar por fuente</option>
                                        <option v-for="source in state.sources" :key="source.id" :value="source.id">{{ source.name }}</option>
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="date" class="form-control" v-model="state.articleFilter.start_date">
                                </div>
                                <div class="input-group mb-3">
                                    <input type="date" class="form-control" v-model="state.articleFilter.end_date">
                                </div>
                            </div>
                            <div class="articles">
                                <div class="card" v-for="article in state.articles" :key="article.id">
                                    <div class="card-header" @click="toggleArticle(article.id)">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span><strong>{{ article.title }}</strong></span>
                                            <span class="text-muted">{{ formatDate(article.pub_date) }}</span>
                                        </div>
                                    </div>
                                    <div class="card-body" v-if="article.showContent">
                                        <p v-html="article.content"></p>
                                        <a :href="article.url" target="_blank" class="btn btn-primary">Ir a la URL del artículo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="card">
                        <div class="card-header">
                            <h5>Noticias</h5>
                        </div>
                        <div class="card-body">
                            <p>Elige el tema de los artículos que quieres ver.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
  <style>
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .articles .card-header {
    cursor: pointer;
  }
  .list-group-item.active {
    background-color: #BF82F8 !important;
    border-color: #BF82F8 !important;
  }
  </style>