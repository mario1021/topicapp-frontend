<script setup>
defineProps(['select'])
</script>

<template>
    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg sticky-top navbar-dark" style="width: 100%;">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <div class="d-flex justify-content-center w-100">
                        <ul class="navbar-nav">
                            <li class="nav-item mx-3">
                                <router-link class="nav-link" :class="{ active: select == 'topic' }" to="/">Tópicos</router-link>
                            </li>
                            <li class="nav-item mx-3">
                                <router-link class="nav-link" :class="{ active: select == 'article' }" to="/articles">Noticias</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="d-flex align-items-center">
                        <button id="btnLogin" type="button" class="btn btn-link-light px-3 me-2">
                            <router-link id="btnLogin" to="/"><font-awesome-icon :icon="['fas', 'right-to-bracket']" inverse /></router-link>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style>
@import '@/assets/main.css';
.container-fluid {
    padding-left: 0% !important;
    padding-right: 0% !important;
}



</style>`;