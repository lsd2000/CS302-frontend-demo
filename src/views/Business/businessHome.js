import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createApp } from 'vue'
import businessHomePage from './businessHome.vue'
import router from '../../router/index.js'

createApp(businessHomePage).use(router).mount('#businessHome')