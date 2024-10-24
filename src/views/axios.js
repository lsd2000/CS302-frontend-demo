import axios from "axios";

const authInstance = axios.create({
  baseURL: process.env.VUE_APP_AUTH_SERVICE_URL, // Use the internal service URL
});

authInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");

const paymentInstance = axios.create({
  baseURL: process.env.VUE_APP_PAYMENT_SERVICE_URL, // Use the internal service URL
});

paymentInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");

const inventoryCartInstance = axios.create({
  baseURL: process.env.VUE_APP_INVENTORY_SERVICE_URL, // Use the internal service URL
});

inventoryCartInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");

const ordersInstance = axios.create({
  baseURL: process.env.VUE_APP_ORDERS_SERVICE_URL, // Use the internal service URL
});

ordersInstance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");

export { authInstance, inventoryCartInstance, ordersInstance };
