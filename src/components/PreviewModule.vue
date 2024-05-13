<template>
  <div class="video-player">
    <video ref="video" :src="source" controls @play="handlePlay" @pause="handlePause"></video>
    <button v-if="!playing" @click="handlePlay">Play</button>
    <button v-if="playing" @click="handlePause">Pause</button>
  </div>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      playing: false,
    };
  },
  beforeDestroy() {
    if (this.$refs.videoPlayer) {
      // Destroy video element and resources (if needed)
      this.$refs.videoPlayer.$destroy();
    }
  },
  methods: {
    handlePlay() {
      this.playing = true;
      this.$refs.video.play();
    },
    handlePause() {
      this.playing = false;
      this.$refs.video.pause();
    },
  },
};
</script>

<style scoped lang="scss">
.video-player {
  position: relative;
  video {
    width: 100%;
  }
  button {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
