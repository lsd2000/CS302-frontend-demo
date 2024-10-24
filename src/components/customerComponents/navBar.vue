<template>
  <div>
    <div class="navBar">
      <div class="container">
        <div class="iconWrapper1">
          <router-link :to="{ name: 'home' }" class="left-text"
            >Home</router-link
          >
          <router-link :to="{ name: 'historyPage' }" class="left-text"
            >History</router-link
          >
        </div>
        <div class="iconWrapper2">
          <router-link :to="{ name: 'notificationPage' }" class="right-text"
            >Notification</router-link
          >
          <router-link :to="{ name: 'cartPage' }" class="right-text"
            >Cart</router-link
          >
          <span class="dropdown">
            <button
              class="btn dropdown-toggle right-text"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="logout">Log out</a>
            </div>
          </span>
        </div>
      </div>
    </div>
    <router-view :user_data="userData" :cart_data="cartData" />
  </div>
</template>

<script>
import { authInstance } from "../../views/axios.js";

export default {
  name: "navBar",
  props: {
    userData: {
      type: Object,
      required: true,
    },
    cartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  async created() {
    console.log("navBar.vue debugging");
    console.log(this.cartData);
    console.log("navBar.vue debugging");
  },
  methods: {
    async logout() {
      try {
        await authInstance.post("/auth/logout");

        localStorage.removeItem("access_token");

        window.location.href = "/";
      } catch (error) {
        window.location.href = "/";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.navBar {
  background-color: #1d951a;
  padding: 20px 0;
}

.dropdown-menu {
  cursor: pointer;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.iconWrapper1,
.iconWrapper2 {
  display: flex;
  align-items: center;
}

.left-text {
  color: #dbd4b7;
  margin-right: 30px;
  font-size: 20px;
  text-decoration: none;
}

.right-text {
  color: #dbd4b7;
  margin-left: 30px;
  font-size: 20px;
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
}

.router-link-active {
  font-weight: bold;
  color: white;
}
</style>