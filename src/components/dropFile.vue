<template>
  <div class="image-upload">
    <div
      class="dropbox"
      @click="openFileInput"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop.prevent="dropFile"
    >
      <p v-if="!image">Click or drag an image here</p>
      <img v-else :src="image" alt="Uploaded Image" />
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
export default {
  name: "dropFile",
  data() {
    return {
      image: null,
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    dragOver(event) {
      event.target.classList.add("dragover");
    },
    dragLeave(event) {
      event.target.classList.remove("dragover");
    },
    dropFile(event) {
      event.target.classList.remove("dragover");
      const file = event.dataTransfer.files[0];
      this.handleImage(file);
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.handleImage(file);
    },
    handleImage(file) {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          this.emitImage(e.target.result); //emit image url
        };
        reader.readAsDataURL(file);
      }
    },
    emitImage(imageUrl) {
      this.$emit("image-uploaded", imageUrl);
    },
  },
};
</script>

<style>
.dropbox {
  border: 2px dashed #ccc;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.dragover {
  background-color: #f0f0f0;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
