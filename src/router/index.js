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
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404错误
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
    }]
  },

  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/article',
    name: 'Blog',
    meta: { title: '博客管理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/category/index'),
        meta: { title: '分类管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'label',
        name: 'label',
        component: () => import('@/views/label/index'),
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
      }
    ]
  },
  // 广告管理
  {
    path: '/advert',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'advert',
        component: () => import('@/views/advert/index'),
        meta: { title: '广告管理', icon: 'el-icon-picture-outline-round' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu1',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'), // Parent router-view
        name: 'user',
        meta: { title: '用户管理', icon: 'el-icon-user-solid' },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'role',
        meta: { title: '角色管理', icon: 'el-icon-coin' }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        name: 'menu',
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      },
    ]
  },
  // 跳转外网
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.usian.cn/index',
        meta: { title: '积云网', icon: 'el-icon-link' }
      }
    ]
  },

  // 刷新当前标签页
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }]
  },

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
