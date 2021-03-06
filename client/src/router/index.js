import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddRecord from '../views/AddRecord.vue'
import ReservoirTrips from '../views/ReservoirTrips.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-record",
    name: "add-record",
    component: AddRecord,
  },
  {
    path:"/:reservoir",
    name: "reservoir-trips",
    component: ReservoirTrips
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
