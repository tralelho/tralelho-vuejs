import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "flag-icon-css/css/flag-icon.css";
import { setupRouter } from "./router";
import { setupI18n } from "./i18n";
import fra from "./locales/fra.json";
import NavBar from "./components/Nav-bar.vue";

library.add(faUserSecret);

const i18n = setupI18n({
  legacy: false,
  locale: "fra",
  fallbackLocale: "fra",
  messages: {
    fra,
  },
  globalInjection: true,
});

const router = setupRouter(i18n);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(i18n);

app.use(router);

app.component("NavBar", NavBar);

app.mount("#app");
