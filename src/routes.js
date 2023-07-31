import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'
import InstructorDashboard from './components/InstructorDashboard'
import RegisterForm from './components/RegisterForm'
import UserCourseList from './components/UserCourseList'

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
    },
    {
      path: '/register-form',
      component: RegisterForm,
    },
    {
      path: '/courses',
      component: UserCourseList,
    },
  ]