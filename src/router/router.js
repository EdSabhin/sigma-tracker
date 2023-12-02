
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Bitcoin from '../views/Bitcoin.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/btc',
    name: "Bitcoin",
    component: Bitcoin
  }
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});


 
