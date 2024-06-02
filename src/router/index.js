import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Main.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = {
    email: localStorage.getItem("email"),
    password: localStorage.getItem("password"),
    logged: localStorage.getItem("logged"),
  };

  if (user.logged === 'false' || user.logged === null) {
    console.log(user.logged);
    next();
  } else {
    console.log(user.logged);
    next();
  }
});

export default router;
