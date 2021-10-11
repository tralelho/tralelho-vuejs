import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Translation from "@/views/Translation";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/translation/:lang",
    name: "Translation",
    component: Translation,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
