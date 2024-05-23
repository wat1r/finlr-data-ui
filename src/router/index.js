import { createRouter, createWebHashHistory } from "vue-router";



const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        name: "App",
        component: () => import("../App.vue"),
        meta: {
          title: "首页",
        },
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
