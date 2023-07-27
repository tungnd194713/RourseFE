import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'
import InstructorDashboard from './components/InstructorDashboard'

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
    },
    {
      path: '/instructor-dashboard',
      component: InstructorDashboard,
    }
  ]