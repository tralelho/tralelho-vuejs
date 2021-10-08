import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.sass";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createI18n } from "vue-i18n";
import "flag-icon-css/css/flag-icon.css";

library.add(faUserSecret);

const messages = {
  en: {
    message: {
      hello: "hello world",
    },
  },
  ja: {
    message: {
      hello: "こんにちは、世界",
    },
  },
};

// 2. Create i18n instance with options
const i18n = createI18n({
  locale: "ja", // set locale
  fallbackLocale: "en", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(i18n);

app.mount("#app");
