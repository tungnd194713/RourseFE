import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'
import InstructorDashboard from './components/InstructorDashboard'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
// import CourseList from './components/CourseList'
import HomePage from './pages/HomePage'
import AppliedCourseList from './components/AppliedCourseList'
import RoadmapDetail from './components/roadmap/RoadmapDetail'
import AppliedRoadmapDetail from './components/roadmap/AppliedRoadmapDetail'

export default [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/roadmaps',
      component: RoadmapDetail,
    },
    {
      path: '/applied-roadmaps',
      component: AppliedRoadmapDetail,
    },
    {
      path: '/roadmaps/1',
      component: AppliedCourseList,
    },
    {
      path: '/create-module',
      component: CreateModule,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create-course',
      component: CreateCourse,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/instructor-dashboard',
      component: InstructorDashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      component: RegisterForm,
    },
    {
      path: '/login',
      component: LoginForm,
    },
    {
      path: '/modules/:id',
      component: VideoPlayer,
      name: 'VideoPlayer',
      meta: {
        requiresAuth: true,
      },
    },
  ]