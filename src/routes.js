import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'

export default [
    {
      path: '/',
      component: VideoPlayer,
    },
    {
      path: '/create-module',
      component: CreateModule,
    },
  ]