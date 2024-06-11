import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import CreateCourse from './components/CreateCourse'
import RegisterForm from './components/RegisterForm'
// import CourseList from './components/CourseList'
import HomePage from './pages/HomePage'
import AppLayout from './layouts/AppLayout'
import MentorAppLayout from './layouts/MentorAppLayout'
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
import EducationRecruitment from './pages/recruitment/EducationRecruitment'
import EducationRoadmap from './pages/recruitment/EducationRoadmap'
import EducationCourse from './pages/recruitment/EducationCourse'
import EducationCreateModule from './pages/recruitment/EducationCreateModule'
import EducationModuleDetail from './pages/recruitment/EducationModuleDetail'
import PublishedEducations from './pages/recruitment/PublishedEducations'
import CourseCreate from './pages/course/CourseCreate'
import ListCourse from './pages/course/ListCourse'
import CourseDetail from './pages/course/CourseDetail'
import LoginPage from './pages/LoginPage'
import MentorProfile from './pages/mentor/MentorProfile'
import MentorShiftList from './pages/mentor/MentorShiftList'
import MentorCourseDetail from './pages/mentor/MentorCourseDetail'
import MentorDashboard from './pages/mentor/MentorDashboard'
import MentorRatingList from './pages/mentor/MentorRatingList'
import InstructorDashboard from './pages/instructor/InstructorDashboard'
import InstructorProfile from './pages/instructor/InstructorProfile'
import InstructorCourse from './pages/instructor/InstructorCourse'
import InstructorCreateModule from './pages/instructor/InstructorCreateModule'
import InstructorExamDetail from './pages/instructor/InstructorExamDetail'
import InstructorTestPreview from './pages/instructor/InstructorTestPreview'
// import InstructorModuleDetail from './pages/instructor/InstructorModuleDetail'
import CompanyList from './pages/users_management/CompanyList'
import InstructorList from './pages/users_management/InstructorList'
import JobSeekerList from './pages/users_management/JobSeekerList'
import MentorList from './pages/users_management/MentorList'

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
				path: '/certificates/:id/subjects',
				component: CertificateSubject,
				name: 'CertificateSubject'
			},
			{
				path: '/majors',
				component: MajorList,
				name: 'MajorList'
			},
			{
				path: '/majors/:id/subjects',
				component: MajorSubject,
				name: 'MajorSubject'
			},
			{
				path: '/colleges',
				component: CollegeList,
				name: 'CollegeList'
			},
			{
				path: '/recruitment/educations',
				component: EducationRecruitment,
				name: 'EducationRecruitment'
			},
			{
				path: '/recruitment/published-educations',
				component: PublishedEducations,
				name: 'PublishedEducations'
			},
			{
				path: '/recruitment/educations/:jobEducationId',
				component: EducationRoadmap,
				name: 'EducationRoadmap'
			},
			{
				path: '/recruitment/educations/:jobEducationId/courses/:courseId',
				component: EducationCourse,
				name: 'EducationCourse'
			},
			{
				path: '/recruitment/educations/:jobEducationId/courses/:courseId/modules/create',
				component: EducationCreateModule,
				name: 'EducationCreateModule'
			},
			{
				path: '/recruitment/educations/:jobEducationId/courses/:courseId/modules/:moduleId',
				component: EducationModuleDetail,
				name: 'EducationModuleDetail'
			},
			{
				path: '/management/users/list',
				component: JobSeekerList,
				name: 'JobSeekerList'
			},
			{
				path: '/management/companies/list',
				component: CompanyList,
				name: 'CompanyList'
			},
			{
				path: '/management/mentors/list',
				component: MentorList,
				name: 'MentorList'
			},
			{
				path: '/management/instructors/list',
				component: InstructorList,
				name: 'InstructorList'
			},
			{
				path: '/courses/create',
				component: CourseCreate,
				name: 'CourseCreate'
			},
			{
				path: '/courses/list',
				component: ListCourse,
				name: 'ListCourse'
			},
			{
				path: '/courses/:id',
				component: CourseDetail,
				name: 'CourseDetail'
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
		],
		meta: {
			requiresAuth: true,
			role: 'admin',
		},
	},
	{
		path: '/',
		component: MentorAppLayout,
		children: [
			{
				path: '/mentor/dashboard',
				component: MentorDashboard,
				name: 'MentorDashboard'
			},
			{
				path: '/mentor/profile',
				component: MentorProfile,
				name: 'MentorProfile'
			},
			{
				path: '/mentor/shift-list',
				component: MentorShiftList,
				name: 'MentorShiftList'
			},
			{
				path: '/mentor/course/:courseId',
				component: MentorCourseDetail,
				name: 'MentorCourseDetail'
			},
			{
				path: '/mentor/rating-list',
				component: MentorRatingList,
				name: 'MentorRatingList'
			},
		],
		meta: {
			requiresAuth: true,
			role: 'mentor',
		},
	},
	{
		path: '/',
		component: AppLayout,
		children: [
			{
				path: '/instructors/dashboard',
				component: InstructorDashboard,
				name: 'InstructorDashboard'
			},
			{
				path: '/instructors/instructor-courses/:instructorCourseId',
				component: InstructorCourse,
				name: 'InstructorCourse'
			},
			{
				path: '/instructors/instructor-courses/:instructorCourseId/courses/:courseId/modules/create',
				component: InstructorCreateModule,
				name: 'InstructorCreateModule'
			},
			{
				path: '/instructors/instructor-courses/:instructorCourseId/courses/:courseId/test/:testId',
				component: InstructorExamDetail,
				name: 'InstructorExamDetail'
			},
			{
				path: '/instructors/instructor-courses/test/:testId/preview',
				component: InstructorTestPreview,
				name: 'InstructorTestPreview'
			},
			{
				path: '/instructors/profile',
				component: InstructorProfile,
				name: 'InstructorProfile'
			},
		],
		meta: {
			requiresAuth: true,
			role: 'instructor',
		},
	},
	{
		path: '/register',
		component: RegisterForm,
	},
	{
		path: '/login',
		component: LoginPage,
	},
]