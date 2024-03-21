import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'
import InstructorDashboard from './components/InstructorDashboard'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
// import CourseList from './components/CourseList'
import HomePage from './pages/HomePage'
import AppLayout from './layouts/AppLayout'
import SurveyPage from './pages/SurveyPage'
import SurveyResult from './pages/SurveyResult'
import AppliedCourseList from './components/AppliedCourseList'
import RoadmapDetail from './components/roadmap/RoadmapDetail'
import AppliedRoadmapDetail from './components/roadmap/AppliedRoadmapDetail'
import CertificateList from './pages/certificate/CertificateList'
import CertificateSubject from './pages/certificate/CertificateSubject'
import MajorList from './pages/major/MajorList'
import MajorSubject from './pages/major/MajorSubject'
import CollegeList from './pages/college/CollegeList'

export default [
    {
      path: '/',
      component: AppLayout,
			children: [
				{
					path: '',
					component: HomePage,
				},
				{
					path: '/certificates',
					component: CertificateList,
					name: 'CertificateList'
				},
				{
					path: '/certificates/subjects',
					component: CertificateSubject,
					name: 'CertificateSubject'
				},
				{
					path: '/majors',
					component: MajorList,
					name: 'MajorList'
				},
				{
					path: '/majors/subjects',
					component: MajorSubject,
					name: 'MajorSubject'
				},
				{
					path: '/colleges',
					component: CollegeList,
					name: 'CollegeList'
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
					path: '/survey',
					component: SurveyPage,
				},
				{
					path: '/survey-result',
					component: SurveyResult,
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
    },
    {
      path: '/register',
      component: RegisterForm,
    },
    {
      path: '/login',
      component: LoginForm,
    },
  ]