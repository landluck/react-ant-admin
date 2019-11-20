import React from 'react';
import Layout from '../layout/index';
import UserLayout from '../layout/UserLayout';

export interface IRouteBase {
  path: string;
  component?: any;
  redirect?: string;
  meta: IRouteMeta;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入，而菜单栏的控制是支持异步请求控制的
 */

const routes: IRoute[] = [
  {
    path: '/system-user',
    component: UserLayout,
    meta: {
      title: '系统路由',
    },
    redirect: '/system-user/login',
    children: [
      {
        path: '/system-user/login',
        component: React.lazy(() => import('../views/system-user/login')),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/system-user/register',
        component: React.lazy(() => import('../views/system-user/register')),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/system-user/register-result',
        component: React.lazy(() => import('../views/system-user/register-result')),
        meta: {
          title: '注册结果',
        },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '业务路由',
    },
    redirect: '/dashborad/google',
    children: [
      {
        path: '/dashborad',
        meta: {
          title: '首页',
          icon: 'dashborad',
        },
        redirect: '/dashborad/google',
        children: [
          {
            path: '/dashborad/google',
            component: React.lazy(() => import('../views/dashborad/google')),
            meta: {
              title: '谷歌',
              icon: 'google',
            },
          },
          {
            path: '/dashborad/alibaba',
            component: React.lazy(() => import('../views/dashborad/alibaba')),
            meta: {
              title: '阿里巴巴',
              icon: 'aliyun',
            },
          },
          {
            path: '/dashborad/dd',
            component: React.lazy(() => import('../views/dashborad/dd')),
            meta: {
              title: '字节跳动',
              icon: 'aliyun',
            },
          },
        ],
      },
      {
        path: '/list',
        meta: {
          title: '列表测试',
          icon: 'table',
        },
        redirect: '/list/list1',
        children: [
          {
            path: '/list/list1',
            component: React.lazy(() => import('../views/list/list1')),
            meta: {
              title: '谷歌',
              icon: 'google',
            },
          },
          {
            path: '/list/list2',
            component: React.lazy(() => import('../views/list/list2')),
            meta: {
              title: '阿里巴巴',
              icon: 'aliyun',
            },
          },
        ],
      },
      {
        path: '/goods',
        meta: {
          title: '商品管理',
          icon: 'table',
        },
        redirect: '/goods/list1',
        children: [
          {
            path: '/goods/list1',
            component: React.lazy(() => import('../views/goods/list1')),
            meta: {
              title: '谷歌',
              icon: 'google',
            },
          },
          {
            path: '/goods/list2',
            component: React.lazy(() => import('../views/goods/list2')),
            meta: {
              title: '阿里巴巴',
              icon: 'aliyun',
            },
          },
          {
            path: '/goods/list3',
            meta: {
              title: '阿里巴巴',
              icon: 'aliyun',
            },
            redirect: '/goods/list3/list',
            children: [
              {
                path: '/goods/list3/list',
                component: React.lazy(() => import('../views/goods/list3/list1')),
                meta: {
                  title: '阿里巴巴',
                  icon: 'aliyun',
                },
              },
              {
                path: '/goods/list3/list2',
                component: React.lazy(() => import('../views/goods/list3/list2')),
                meta: {
                  title: '阿里巴巴',
                  icon: 'aliyun',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
