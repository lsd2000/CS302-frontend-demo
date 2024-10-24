<template>
  <div id="businessHome">
    <div v-cloak>
      <div v-if="user">
        <businessNavBar :userData="user" />
      </div>

      <div
        v-show="!user"
        v-cloak
        style="
          position: relative;
          top: 300px;
          border: 2px solid black;
          background: #64e761;
          padding: 20px;
          display: inline-block;
        "
      >
        <h2>
          You are not logged in! <br />
          <br />Click the button below to return to login page <br />
          <br />
        </h2>
        <a href="/">
          <button
            type="button"
            class="btn btn-success"
            style="background-color: #1d951a"
          >
            Login Page
          </button>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import businessNavBar from "../../components/businessComponents/businessNavBar.vue";
import {authInstance} from "../../views/axios.js";

export default {
  name: "businessHomePage",

  data() {
    return {
      user: null,
    };
  },

  async created() {
    console.log("Bearer " + localStorage.getItem("access_token"));

    try {
      const response = await authInstance.get("/users");

      console.log(response);
      this.user = response.data;
    } catch (error) {
      console.error(error);
    }
  },

  components: {
    businessNavBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&family=Open+Sans&display=swap");
#businessHome {
  font-family: "Lato", "Montserrat", "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



<style scoped>
/*set color for background of page*/

body {
  margin: 0;
  padding: 0;
  background-color: #bdedbc;
}

#businessHome[v-cloak] {
  display: none;
}

/* Other component-specific styles */
</style>
