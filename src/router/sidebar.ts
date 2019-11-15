import { IRoute } from './config'

// 此配置文件是用来渲染左边菜单栏的
export const routes: IRoute[] = [
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