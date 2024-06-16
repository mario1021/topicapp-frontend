import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faPlus, faTrashCan, faEdit, faCircleLeft, faRightToBracket)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

app
.component('font-awesome-icon', FontAwesomeIcon)
.component('v-select', vSelect)
.mount('#app')