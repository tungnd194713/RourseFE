import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'

export default [
    {
      path: '/',
      component: VideoPlayer,
    },
    {
      path: '/create-module',
      component: CreateModule,
    },
    {
      path: '/create-course',
      component: CreateCourse,
    }
  ]