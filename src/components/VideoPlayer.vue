<template>
  <div>
		<h1>
			{{modules.name}}
		</h1>
		<div class="video-container">
      <video ref="videoPlayer" class="video-js"></video>
			<div class="quizzes-cotainer">
				<div v-for="(quizz, index) in modules.content[0].check_point_quizzes" :key="index">
					<div>
						<h2>{{quizz.question}}</h2>
						<div v-for="(option, ind) in quizz.answers" :key="ind">
							<label :for="option.text">
								<input type="radio" :name="quizz.question" :value="option.value" v-model="selectedOption">
								{{ option.text }}
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    },
		modules: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null,
			selectedOption: 0,
    }
  },
  mounted() {
    // const vm = this
		// const quizzSet = [...this.modules.content[0].check_point_quizzes]
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
      let currentTime = 0;
			const self = this
      this.player.on('seeking', function(){
        if(self.player.currentTime() > currentTime) {
          self.player.currentTime(currentTime);
        }
      });
			setInterval(() => {
				currentTime = self.player.currentTime();
			}, 1000);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>