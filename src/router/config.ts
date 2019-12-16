import React from 'react';

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
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
    path: '/system',
    component: React.lazy(() => import('../layout/UserLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import('../views/system/login')),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/system/register',
        component: React.lazy(() => import('../views/system/register')),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/system/register-result/:id',
        auth: false,
        component: React.lazy(() => import('../views/system/registerResult')),
        meta: {
          title: '注册结果',
        },
      },
      {
        path: '/system/recovery-pwd',
        auth: false,
        component: React.lazy(() => import('../views/system/recoveryPwd')),
        meta: {
          title: '重置密码',
        },
      },
    ],
  },
  {
    path: '/',
    component: React.lazy(() => import('../layout/index')),
    meta: {
      title: '系统',
    },
    redirect: '/dashborad/intro',
    children: [
      {
        path: '/dashborad',
        meta: {
          title: '首页',
          icon: 'dashborad',
        },
        redirect: '/dashborad/intro',
        children: [
          {
            path: '/dashborad/intro',
            component: React.lazy(() => import('../views/dashborad/intro')),
            meta: {
              title: '系统介绍',
              icon: 'read',
            },
          },
        ],
      },

      // 以下菜单为系统权限管理
      {
        path: '/auth',
        meta: {
          title: '权限管理',
          icon: 'setting',
        },
        redirect: '/auth/menu',
        children: [
          {
            path: '/auth/menu',
            meta: {
              title: '菜单管理',
              icon: 'menu',
            },
            component: React.lazy(() => import('../views/auth/menu')),
          },
          {
            path: '/auth/role',
            meta: {
              title: '角色管理',
              icon: 'team',
            },
            component: React.lazy(() => import('../views/auth/role')),
          },
          {
            path: '/auth/user',
            meta: {
              title: '用户管理',
              icon: 'user',
            },
            component: React.lazy(() => import('../views/auth/user')),
          },
        ],
      },

      // 以下的路由改动请小心，涉及权限校验模块
      {
        path: '/error',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
        children: [
          {
            path: '/error/404',
            auth: false,
            component: React.lazy(() => import('../views/error/404')),
            meta: {
              title: '页面不存在',
            },
          },
          {
            path: '/error/403',
            auth: false,
            component: React.lazy(() => import('../views/error/403')),
            meta: {
              title: '暂无权限',
            },
          },
        ],
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];

export default routes;
