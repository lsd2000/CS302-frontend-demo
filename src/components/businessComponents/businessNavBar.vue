<template>
  <div>
    <div class="navBar">
      <div class="container">
        <div class="iconWrapper1">
          <router-link :to="{ name: 'businessHome' }" class="left-text"
            >Home</router-link
          >
          <router-link :to="{ name: 'listingCreation' }" class="left-text"
            >List New Product</router-link
          >
          <router-link :to="{ name: 'transaction' }" class="left-text"
            >Transaction Data</router-link
          >
        </div>
        <div class="iconWrapper2">
          <router-link :to="{ name: 'businessNotification' }" class="left-text"
            >Notification</router-link
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
    <router-view :user_data="userData" />
  </div>
</template>

<script>
import { authInstance } from "../../views/axios.js";

export default {
  name: "businessNavBar",
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async logout() {
      try {
        await authInstance.post("/auth/logout", {});
        // Request response is 200 but still shows error. To investigate
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

.dropdown-menu{
  cursor: pointer;
}

/* Apply the router-link-exact-active class for active links */
.iconWrapper1 a.router-link-exact-active,
.iconWrapper2 a.router-link-exact-active {
  color: white;
  background: #1d951a;
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
</style>