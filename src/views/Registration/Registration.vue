<template>
  <div id="registration">
    <div v-for="rowIndex in 4" :key="rowIndex" class="row mb-4">
      <div class="col">
        <img
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          :src="
            require(`@/assets/registration-background-image${
              imageIndex + 1
            }.jpg`)
          "
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
    </div>

    <div>
      <registrationDetails />
    </div>
  </div>
</template>


<script>
import registrationDetails from "../../components/registrationDetails.vue";
export default {
  name: "RegistrationPage",
  components: {
    registrationDetails,
  },
  data() {
    return {
      images: [1, 2, 3, 4], // Add more indices if you have additional images
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&family=Open+Sans&display=swap");
#registration {
  font-family: "Lato", "Montserrat", "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



<style scoped>
/*set color for background of page*/

body {
  margin: 0;
  padding: 0;
  background-color: #bdedbc;
}

/* Other component-specific styles */
</style>
