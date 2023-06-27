<template>
  <div>
		<h1>
			{{modules.name}}
		</h1>
		<div class="video-container">
      <video ref="videoPlayer" :class="{'no-pointer': isStop}" class="video-js vjs-default-skin"></video>
			<div v-if="isStop" class="quizzes-container">
        <h2>Please answer the quizz before continue watching</h2>
				<div v-for="(quizz, index) in modules.check_point_quizzes" :key="index">
					<div v-if="quizzShown == index">
						<h2>{{quizz.question}}</h2>
						<div v-for="(option, ind) in quizz.answers" :key="ind">
							<label :for="option.text">
								<input type="radio" :name="quizz.question" :value="option.value" v-model="selectedOption">
								{{ option.text }}
							</label>
						</div>
            <button @click="chooseAnswer(index)">Choose</button>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'videojs-markers';
import { CourseService } from '@/services'

export default {
  name: 'VideoPlayer',
  data() {
    return {
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              type: 'video/mp4'
          }
        ]
      },
      modules: {},
			selectedOption: 0,
      videoMarker: 0,
      isStop: false,
      quizzShown: -1,
      remainedQuizzes: [],
    }
  },
  watch: {
    isStop(val) {
      if (val) {
        // this.player.controls(false)
        this.player.pause();
      } else {
        // this.player.controls(true)
        this.player.play();
      }
    }
  },
  async mounted() {
    await this.getCourse()
    const vm = this
    this.remainedQuizzes = this.modules.check_point_quizzes.map((items) => {
      if (items.check_time > vm.videoMarker)
        return {...items, is_answered: false};
    })
		// const quizzSet = [...this.modules.content[0].check_point_quizzes]
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
      this.player.log('onPlayerReady', this);
      this.player.markers({
          markers: [
            { time: vm.videoMarker, text: 'Current playing' },
          ]
        });
      let currentTime = 0;
      let markedTime = vm.videoMarker
			const self = this
      this.player.on('seeking', function(){
        if(self.player.currentTime() > currentTime && self.player.currentTime() > markedTime) {
          self.player.currentTime(currentTime);
        }
      });
      this.player.on('timeupdate', function() {
        vm.remainedQuizzes.forEach((items, index) => {
          if (currentTime > items.check_time && currentTime < items.check_time + 1 && !items.is_answered) {
            vm.isStop = true
            vm.quizzShown = index
            vm.selectedOption = 0
          }
        })
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
  methods: {
    chooseAnswer(index) {
      if (this.selectedOption) {
        this.isStop = false
        this.quizzShown = -1
        this.remainedQuizzes[index].is_answered = true
      }
    },
    async getCourse() {
      const { data } = await CourseService.getCourse();
      this.modules = {...data[0].modules[0]};
      this.videoOptions.sources[0].src = this.modules.video;
    }
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
}
.video-js > video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.video-container {
  position: relative;
}
.video-container .quizzes-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 1280px;
  height: calc(100% - 30px);
  background-color: rgba(0, 0, 0, 0.7); /* Adjust overlay color as needed */
  margin-right: auto;
  margin-left: auto;
}
</style>