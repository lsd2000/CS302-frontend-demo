import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import homePage from "./Home.vue";
import router from "../../router/index.js";

createApp(homePage).use(router).mount("#home");
