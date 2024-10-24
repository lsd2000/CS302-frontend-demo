<template>
  <div id="notification">
    <div class="center-content">
      <div class="maintenance-message">
        <h1>Sorry! This page has been moved to telegram.</h1>
      </div>
    </div>
    <div v-for="rowIndex in 4" :key="rowIndex" class="row mb-4">
      <div class="col">
        <img
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          :src="require(`@/assets/constructionimage${imageIndex + 1}.jpg`)"
          class="img-fluid"
          alt="Responsive image"
        />
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "notificationPage",
  data() {
    return {
      images: [1, 2, 3, 4],
    };
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #bdedbc;
}

.maintenance-message {
  border: 2px solid black;
  background: #1d951a;
  padding: 50px;
  color: white;
  text-align: center;
}

.center-content {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#notification {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>