<template>
  <div>
		<h1 style="text-align: center">
			{{modules.name}}
		</h1>
		<div class="video-container">
      <video id="video-player" ref="videoPlayer" :class="{'no-pointer': isStop}" class="video-js vjs-default-skin" height="600"></video>
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
    <el-tabs type="card" v-model="activeName" class="discussion-section">
      <el-tab-pane label="Note" name="note">
        <el-card>
          <div slot="header" class="note-header">Notes</div>
          <el-list>
            <el-list-item v-for="note in notes" :key="note.id">
              <el-button type="info" round @click="toVideoTime(note.noted_video_time)">{{ formattedCurrentTime(note.noted_video_time) }}</el-button>
              <div class="note-content">{{ note.content }}</div>
            </el-list-item>
          </el-list>
          <el-form class="note-form">
            <el-button type="info" round>{{ formattedCurrentTime(player?.currentTime()) }}</el-button>
            <el-form-item>
              <el-input
                v-model="newNoteContent"
                placeholder="Enter your note"
                type="textarea"
                rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="takeNote">{{noteButton}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Discussion" name="discussion">
        <div class="discussion-list" v-if="currentDiscussionIndex === -1">
          <div v-for="(discussion, index) in discussionList" :key="discussion.id" class="discussion-item">
            <div class="left-section">
              <div class="avatar">
                <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
              </div>
            </div>
            <div class="right-section">
              <div class="title-container">
                <div class="q-title" @click="toReplies(index)">{{discussion.title}}</div>
                <div class="reply-section">
                  <div class="upvote">{{discussion.upvoted_by.length}} upvoted</div>
                  <div class="reply">{{discussion?.discussionReplies?.length || 0}} replies</div>
                </div>
              </div>
              <div class="discussion-footer">
                <div class="asked-by"><a href="">{{discussion.user_id.name}}</a></div>
                <div class="asked-video-time"><el-button type="info" round>{{ formattedCurrentTime(discussion.noted_video_time) }}</el-button></div>
                <div class="asked-date">Just now</div>
              </div>
            </div>
          </div>
        </div>
        <div class="reply-list" v-if="currentDiscussionIndex !== -1">
          <el-button type="primary" @click="currentDiscussionIndex = -1">Back to discussion channel</el-button>
          <div class="discussion-item">
            <div class="left-section">
              <div class="avatar">
                <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
              </div>
            </div>
            <div class="right-section">
              <div class="title-container">
                <div class="q-title">
                  <div class="title">
                    {{currentDiscussion?.title}}
                  </div>
                  <div class="content">
                    {{currentDiscussion?.content}}
                  </div>
                </div>
                <div class="reply-section">
                  <div class="upvote">{{currentDiscussion?.upvoted_by?.length}} upvoted</div>
                </div>
              </div>
              <div class="discussion-footer">
                <div class="asked-by"><a href="">{{currentDiscussion?.user_id?.name}}</a></div>
                <div class="asked-video-time"><el-button type="info" round>{{ formattedCurrentTime(currentDiscussion?.noted_video_time) }}</el-button></div>
                <div class="asked-date">Just now</div>
              </div>
            </div>
          </div>
          <div style="display: flex; margin-bottom: 25px; font-weight: bold; padding-left: 15px">
            <div>{{currentDiscussion?.discussionReplies?.length}} replies</div>
          </div>
          <div class="reply-section" style="margin-left: 30px">
            <div class="reply-item" style="padding: 0 1.5rem; margin-bottom: 25px" v-for="(reply, r_index) in currentDiscussion.discussionReplies" :key="r_index">
              <div style="display: flex">
                <div class="avatar">
                  <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                </div>
                <div style="flex: 1">
                  <div style="margin-bottom: 30px">
                    <div style="display:flex; justify: space-between; margin-bottom: 10px">
                      <el-col :span="22" style="font-size: 20px; font-weight: bold"><a href="">{{reply.user_id?.name}}</a></el-col>
                      <el-col :span="2"><div class="upvote">{{reply.upvoted_by.length}} upvoted</div></el-col>
                    </div>
                    <div style="font-size: 12px">Just now</div>
                  </div>
                  <div>{{reply.content}}</div>
                </div>
              </div>
            </div>
            <div class="reply-add" style="padding: 0 1.5rem">
              <div style="display: flex">
                <div class="avatar">
                  <img src="https://media.istockphoto.com/id/178617135/photo/flamy-symbol.jpg?s=612x612&w=0&k=20&c=GxdJYAWZkcX9aIiwvDt63eGjRZADqctUar0d71UHGVk=" alt="">
                </div>
                <div style="flex: 1">
                  <div>
                    <textarea v-model="replyText" style="width: 100%; margin-bottom: 15px; resize: none" name="" id="" rows="5"></textarea>
                    <el-button type="info" style="float: right" @click="addReply">
                      Add reply
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    
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
      activeName: 'discussion',
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
      websocket: null,
      moduleProgress: {},
      newNoteContent: '',
      notes: [],
      discussionList: [],
      currentDiscussionIndex: -1,
      currentDiscussion: {},
      replyText: '',
      videoDuration: 0,
      currentInterval: 0,
    }
  },
  computed: {
    noteButton () {
      return this.notes.findIndex(item => parseInt(item.noted_video_time) == parseInt(this.player?.currentTime())) > -1 ? 'Edit note' : 'Add note'; 
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
    this.connectWebsocket()
    await this.getDiscussion(this.$route.params.id)
    await this.getNotes(this.$route.params.id)
    const vm = this
    this.remainedQuizzes = this.modules.check_point_quizzes?.map((items) => {
      if (items.check_time > vm.videoMarker)
        return {...items, is_answered: false};
    })
		// const quizzSet = [...this.modules.content[0].check_point_quizzes]
    var myVideo = document.getElementById("video-player");
    myVideo.onloadedmetadata = function() {
      vm.videoDuration = this.duration
    };
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, () => {
      this.player.log('onPlayerReady', this);
      
      this.player.markers({
        markers: [
          ...this.notes.map(item => {
            return {
              time: item.noted_video_time,
              text: item.content,
            }
          }),
          { id: 'currentPlaying', time: vm.videoMarker, text: 'Current playing' },
        ]
      })
      let currentTime = 0;
      let markedTime = vm.videoMarker
      this.player?.currentTime(vm.videoMarker)
			const self = this
      this.player.on('seeking', function(){
        if(self.player?.currentTime() > currentTime && self.player?.currentTime() > markedTime) {
          self.player?.currentTime(currentTime);
        }
      });

      function updateProgress() {
        const updateData = {
          module_id: vm.modules._id,
          module_progress: {
            video_played_time: currentTime,
            user_id: vm.$store.getters.authUser.id,
          },
          video_duration: vm.videoDuration,
        };
        vm.websocket.send(JSON.stringify(updateData));
      }
      this.player.on('play', function() {
        updateProgress();
        this.updateIntervalId = setInterval(updateProgress, 2000);
      });
      this.player.on('pause', function() {
        clearInterval(this.updateIntervalId);
      });

      this.player.on('timeupdate', function() {
        // if (self.player.currentTime() > markedTime) {
        //   const updateData = {
        //     progress_id: vm.moduleProgress.id,
        //     module_progress: {
        //       video_played_time: self.player.currentTime(),
        //     },
        //   }
        //   vm.websocket.send(JSON.stringify(updateData))
        // }
        vm.remainedQuizzes.forEach((items, index) => {
          if (currentTime > items?.check_time && currentTime < items?.check_time + 1 && !items.is_answered) {
            vm.isStop = true
            vm.quizzShown = index
            vm.selectedOption = 0
          }
        })
      })
			vm.currentInterval = setInterval(() => {
				currentTime = self.player?.currentTime();
        if (currentTime > markedTime && currentTime) {
          self.player.markers.removeAll();
          self.player.markers.add([{ time: currentTime, text: 'Current playing' }]);
          markedTime = currentTime
        }
			}, 1000);
    });
  },
  destroyed() {
    clearInterval(this.currentInterval)
  },
  methods: {
    formattedCurrentTime(value) {
      let pad = function(input) {return (input < 10) ? "0" + input : input;};
      return [
          pad(Math.floor(value % 3600 / 60)),
          pad(Math.floor(value % 60)),
      ].join(':'); 
    },
    toVideoTime(time) {
      this.player.currentTime(time);
    },
    chooseAnswer(index) {
      if (this.selectedOption) {
        this.isStop = false
        this.quizzShown = -1
        this.remainedQuizzes[index].is_answered = true
      }
    },
    async getCourse() {
      const { data } = await CourseService.getCourse(this.$route.params.id);
      console.log(data)
      this.modules = {...data};
      this.videoMarker = this.modules.video_played_time;
      this.videoOptions.sources[0].src = this.modules.video;
    },
    async getNotes(moduleId) {
      const { data } = await CourseService.getNotes(moduleId)
      this.notes = [...data];
    },
    async getDiscussion(moduleId) {
      const { data } = await CourseService.getDiscussionByModule(moduleId)
      this.discussionList = [...data];
    },
    async takeNote() {
      const body = {
        noted_video_time: this.player.currentTime(),
        content: this.newNoteContent,
      }
      const currentNoteIndex = this.notes.findIndex(item => item.noted_video_time === this.player.currentTime());
      if (currentNoteIndex > -1) {
        const { data } = await CourseService.editNote(this.modules._id, body);
        if (data) {
          this.notes[currentNoteIndex] = {...data}
          this.newNoteContent = ''
        }
      } else {
        const { data } = await CourseService.takeNote(this.modules._id, body);
        if (data) {
          this.notes.push(data)
          this.newNoteContent = ''
        }
      }
    },
    async addReply() {
      const body = {
        upvoted_by: [],
        content: this.replyText,
      }
      if (this.currentDiscussionIndex > -1) {
        const { data } = await CourseService.addReply(this.modules._id, this.currentDiscussion.id, body);
        console.log(data)
        if (data) {
          this.currentDiscussion.discussionReplies.push({...data, user_id: {name: 'tungnd'}});
          this.replyText = ''
        }
      }
    },
    toReplies(index) {
      this.currentDiscussionIndex = index
      this.currentDiscussion = {...this.discussionList[index]}
    },
    connectWebsocket() {
      // Establish WebSocket connection
      this.websocket = new WebSocket('ws://localhost:3000/websockets');

      this.websocket.onopen = () => {
        console.log('WebSocket connection established');
      };

      this.websocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>
<style lang="scss" scoped>
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
  text-align: center;
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
.avatar {
  width: 3.6rem;
  height: 3.6rem;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  margin-right: 25px;
}
.discussion-section {
  margin: 0 auto;
  margin-bottom: 5rem;
  max-width: 84.8rem;
  padding: 3.2rem 2.4rem 0;
  .discussion-list {
    .discussion-item:hover {
      background: #f7f9fa;
    }
    .q-title {
      cursor: pointer;
    }
  }
}
.discussion-item {
    display: flex;
    padding: 1.6rem 2.4rem;
    .right-section {
      flex: 1;
    }
    .title-container {
      display: flex;
      font-weight: bold;
      div {
        margin-bottom: 15px;
      }
      .q-title {
        font-size: 20px;
        flex: 1;
        .content {
          font-size: 16px;
          font-weight: 100;
          margin-top: 25px;
        }
      }
    }
    .discussion-footer {
      display: flex;
      align-items: center;
      div {
        margin-right: 20px;
      }
    }
  }
</style>