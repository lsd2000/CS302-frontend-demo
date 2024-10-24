<template>
  <div id="transaction-data">
    <div class="center-content">
      <div class="maintenance-message">
        <h1>Sorry! This page is under maintenance.</h1>
        <audio ref="audioPlayer" :src="audioSrc" loop></audio>

        <button
          style="position: relative; top: 18px; border: none; padding: 5px"
          @click="toggleAudio"
        >
          {{ isAudioPlaying ? "Pause Audio" : "Play Audio" }}
        </button>
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
import audioFile from "../../assets/background-audio.mp3";
export default {
  name: "transactionDataPage",
  data() {
    return {
      audioSrc: audioFile,
      images: [1, 2, 3, 4],
      isAudioPlaying: false,
    };
  },
  methods: {
    toggleAudio() {
      const audioPlayer = this.$refs.audioPlayer;

      if (audioPlayer) {
        if (this.isAudioPlaying) {
          audioPlayer.pause(); // Pause the audio
        } else {
          audioPlayer.play(); // Play the audio
        }

        this.isAudioPlaying = !this.isAudioPlaying;
      }
    },
  },
  mounted() {
    // Automatically play the audio when the component is mounted
    const audioPlayer = this.$refs.audioPlayer;
    if (audioPlayer) {
      audioPlayer.play();
      this.isAudioPlaying = true;
    }
  },
  beforeUnmount() {
    // Pause the audio when the component is about to be destroyed (leaving the website)
    const audioPlayer = this.$refs.audioPlayer;
    if (audioPlayer) {
      audioPlayer.pause();
    }
  },
};
</script>

<style scoped>
/*set color for background of page*/

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

#transaction-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Other component-specific styles */
</style>
