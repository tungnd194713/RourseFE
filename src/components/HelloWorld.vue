<template>
  <div>
    <video-player :options="videoOptions" :modules="course.modules[0]" />
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  name: 'VideoExample',
  components: {
    VideoPlayer
  },
  data() {
    return {
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
      course: {
    modules: [
      {
        name: "Module 1",
        description: "Some descriptions",
        content: [
          {
            video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            check_point_quizzes: [
              {
                question: "How do si f u",
                answers: [
                  {
                    text: "Do it 1",
                    value: 1
                  },
                  {
                    text: "Do it 2",
                    value: 2
                  },
                  {
                    text: "Do it 3",
                    value: 3
                  },
                  {
                    text: "Do it 4",
                    value: 4
                  }
                ],
                corrent_answer: 3,
                check_time: 15,
                is_answered: false,
              },
              {
                question: "How do i f u",
                answers: [
                  {
                    text: "Do it 1",
                    value: 1
                  },
                  {
                    text: "Do it 2",
                    value: 2
                  },
                  {
                    text: "Do it 3",
                    value: 3
                  },
                  {
                    text: "Do it 4",
                    value: 4
                  }
                ],
                corrent_answer: 2,
                check_time: 30,
                is_answered: false,
              }
            ]
          }
        ]
      }
    ]
  },
    };
  }
};
</script>