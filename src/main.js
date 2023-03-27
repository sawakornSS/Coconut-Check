import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "vuetify/dist/vuetify.min.css";
import JsonExcel from "vue-json-excel3";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { createPinia } from "pinia";
const pinia = createPinia();
loadFonts();

createApp(App)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .component("downloadExcel", JsonExcel)
  .component("Datepicker", Datepicker)
  .mount("#app");
