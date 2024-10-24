<template>
  <div id="app">
    <div id="nav" style="position: absolute; right: 70px">
      <router-link :to="{ name: 'customer' }">Customer</router-link> |
      <router-link :to="{ name: 'business' }">Business</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style scoped>
#nav {
  display: inline-block;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
  padding: 5px;
  font-size: 15px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  color: white;
  background: #1d951a;
}

</style>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&family=Open+Sans&display=swap");
#app {
  font-family: "Lato", "Montserrat", "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
