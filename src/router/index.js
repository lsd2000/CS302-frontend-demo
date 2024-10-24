import { createRouter, createWebHistory } from "vue-router";
import userLogin from "../components/userLogin.vue";

const routes = [
  {
    path: "/",
    name: "customer",
    component: userLogin,
  },
  {
    path: "/business",
    name: "business",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/userLogin.vue"),
  },
  {
    path: "/businessHome/Transaction",
    name: "transaction",
    component: () =>
      import("../components/businessComponents/TransactionPage.vue"),
  },
  {
    path: "/businessHome",
    name: "businessHome", //businesshome shall render the prodcut component
    component: () =>
      import("../components/businessComponents/businessProductListing.vue"),
  },
  {
    path: "/businessHome/Notification",
    name: "businessNotification",
    component: () =>
      import("../components/businessComponents/businessNotification.vue"),
  },
  {
    path: "/businessHome/listingCreation",
    name: "listingCreation",
    component: () =>
      import("../components/businessComponents/createListing.vue"),
  },
  {
    path: "/home/cartPage",
    name: "cartPage",
    component: () => import("../components/customerComponents/cartPage.vue"),
  },
  {
    path: "/home/historyPage",
    name: "historyPage",
    component: () => import("../components/customerComponents/historyPage.vue"),
  },
  {
    path: "/home/notification",
    name: "notificationPage",
    component: () => import("../components/customerComponents/notification.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/customerComponents/productListing.vue"),
  },
  {
    path: "/home/cartPage/success",
    name: "paymentSuccess",
    component: () => import("../components/customerComponents/paymentSuccess.vue"),
  },
  {
    path: "/home/cartPage/failure",
    name: "paymentFailure",
    component: () => import("../components/customerComponents/paymentFailure.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
