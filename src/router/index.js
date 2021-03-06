import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/data',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '数据浏览', icon: 'table' }
      }
    ]
  },

  {
    path: '/myinfo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'MyInfo',
        component: () => import('@/views/my/info'),
        meta: { title: '个人信息', icon: 'info' }
      }
    ]
  },

  {
    path: '/mydata',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'MyData',
        component: () => import('@/views/my/evalution'),
        meta: { title: '我的评估', icon: 'table' }
      }
    ]
  },

  {
    path: '/evaluation',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Evaluation',
        component: () => import('@/views/evaluation/index'),
        meta: { title: '问题评估', icon: 'el-icon-star-on' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/post_question'),
        meta: { title: '提交问题', icon: 'form' }
      }
    ]
  },

  {
    path: '/upload',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Upload',
        component: () => import('@/views/upload/index'),
        meta: { title: '上传数据', icon: 'el-icon-upload' }
      }
    ]
  },

  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'About',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我们', icon: 'el-icon-s-opportunity' }
      }
    ]
  },

  {
    path: '/qg',
    component: Layout,
    // redirect: '/datainput',
    name: 'QG',
    meta: { title: '问题生成', icon: 'el-icon-goods' },
    children: [
      {
        path: 'datainput',
        name: 'DataInput',
        component: () => import('@/views/qg/DataInput'),
        meta: { title: '数据输入' }
      },
      {
        path: 'content',
        name: 'ContentExtraction',
        component: () => import('@/views/qg/ContentExtraction'),
        meta: { title: '内容抽取' }
      },
      {
        path: 'qgevaluation',
        name: 'QGEvaluation',
        component: () => import('@/views/qg/QGEvaluation'),
        meta: { title: '问题生成和评估' }
      },
      {
        path: 'distractor',
        name: 'DistractorGeneration',
        component: () => import('@/views/qg/DistractorGeneration'),
        meta: { title: '干扰项生成' }
      },
      {
        path: 'output',
        name: 'OutputStorage',
        component: () => import('@/views/qg/OutputStorage'),
        meta: { title: '输出入库' }
      },
    ]
  },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/Congregalis',
  //       meta: { title: '关于我们', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
