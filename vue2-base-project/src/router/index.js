import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routeOptions = [{ path: "/home", name: "home" }];

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
];

routeOptions.forEach((route) => {
  routes.push({
    ...route,
    component: () =>
      import(
        /* webpackChunkName: "[request]" */ `@/views/${route.name}/index.vue`
      ),
  });
});

console.log(routes, "routes");

const router = new VueRouter({
  routes,
});

export default router;
