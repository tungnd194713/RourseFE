import VideoPlayer from './components/VideoPlayer'
import CreateModule from './components/CreateModule'
import ModuleDetail from './components/ModuleDetail'
import ExamPage from './components/ExamPage'

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
      path: '/module-detail',
      component: ModuleDetail,
    },
    {
      path: '/exam',
      component: ExamPage,
    },
  ]