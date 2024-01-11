import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/Public/LoginView.vue";
import beforeEach from "./before-each";

const routes = [
  {
    path: process.env.VUE_APP_PUBLIC_PATH + "login",
    name: "login",
    component: LoginView,
    meta: {
      isPublic: true,
    },
  },
  {
    path: process.env.VUE_APP_PUBLIC_PATH,
    name: "home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_PUBLIC_PATH),
  routes,
});

router.beforeEach(beforeEach);
export default router;
