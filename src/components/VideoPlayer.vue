<template>
  <div>
		<h1>
			{{modules.name}}
		</h1>
		<div class="video-container">
      <video ref="videoPlayer" :class="{'no-pointer': isStop}" class="video-js"></video>
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
import 'videojs-markers';

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
      videoMarker: 0,
      isStop: false,
    }
  },
  mounted() {
    const vm = this
		// const quizzSet = [...this.modules.content[0].check_point_quizzes]
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
      this.player.markers({
          markers: [
            { time: vm.videoMarker, text: 'Current playing' },
          ]
        });
        console.log(this.player.controlBar)
      let currentTime = 0;
      let markedTime = vm.videoMarker
			const self = this
      this.player.on('seeking', function(){
        if(self.player.currentTime() > currentTime && self.player.currentTime() > markedTime) {
          self.player.currentTime(currentTime);
        }
      });
      this.player.on('timeupdate', function() {
        if (currentTime >= 10) {
          vm.isStop = true
          self.player.controlBar.hide()
          self.player.pause();
        }
      })
			setInterval(() => {
				currentTime = self.player.currentTime();
        if (currentTime > markedTime) {
          self.player.markers.removeAll();
          self.player.markers.add([{ time: currentTime, text: 'Current playing' }]);
          markedTime = currentTime
        }
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
<style scoped>
@import 'video.js/dist/video-js.css';
@import 'videojs-markers/dist/videojs.markers.css';
.no-pointer {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>