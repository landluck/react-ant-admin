import React from 'react'
import Layout from '../layout/index'
import UserLayout from '../layout/userLayout'

export interface IRouteBase {
  path: string
  component?: any
  meta: IRouteMeta
}

export interface IRouteMeta {
  title: string
  icon?: string
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/system-user',
    component: UserLayout,
    meta: {
      title: '系统路由'
    },
    children: [
      {
        path: '/system-user/login',
        component: React.lazy(() => import('../views/user/login')),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/system-user/register',
        component: React.lazy(() => import('../views/user/register')),
        meta: {
          title: '注册'
        }
      },
      {
        path: '/system-user/register-result',
        component: React.lazy(() => import('../views/user/register-result')),
        meta: {
          title: '注册结果'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '业务路由'
    },
    children: [
      { 
        path: '/dashborad',
        meta: {
          title: 'Dashborad',
          icon: 'medium'
        },
        children: [
          {
            path: '/dashborad/google',
            meta: {
              title: '分析页',
              icon: 'google'
            },
          },
          {
            path: '/dashborad/codepen',
            meta: {
              title: '分析页',
              icon: 'codepen'
            },
          },
          {
            path: '/dashborad/aliyun',
            meta: {
              title: '监控页',
              icon: 'aliyun'
            },
          },
          {
            path: '/dashborad/windows',
            meta: {
              title: '工作台',
              icon: 'windows'
            },
          }
        ]
      },
      { 
        path: 'app/index',
        meta: {
          title: 'medium',
          icon: 'medium'
        },
        children: [
          {
            path: 'app/index/google',
            meta: {
              title: '分析页',
              icon: 'google'
            },
          },
          {
            path: 'app/index/codepen',
            meta: {
              title: '分析页',
              icon: 'codepen'
            },
          },
          {
            path: 'app/index/aliyun',
            meta: {
              title: '监控页',
              icon: 'aliyun'
            },
          },
          {
            path: 'app/index/windows',
            meta: {
              title: '工作台',
              icon: 'windows'
            },
          }
        ]
      },
    ]
  }
]


export default routes