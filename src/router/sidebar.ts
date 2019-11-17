import { IRoute } from './config'

// 此配置文件是用来渲染左边菜单栏的
export const routes: IRoute[] = [
  { 
    path: '/dashborad',
    meta: {
      title: 'Dashborad',
      icon: 'aliyun'
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
      icon: 'aliyun'
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
  { 
    path: 'app/home',
    meta: {
      title: 'medium',
      icon: 'aliyun'
    },
    children: [
      {
        path: 'app/home/google',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: 'app/home/codepen',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: 'app/home/aliyun',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: 'app/home/windows',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },

  { 
    path: 'app/test',
    meta: {
      title: 'medium',
      icon: 'aliyun'
    },
    children: [
      {
        path: 'app/test/google',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: 'app/test/codepen',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: 'app/test/aliyun',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: 'app/test/windows',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
  { 
    path: 'app/ccc',
    meta: {
      title: 'medium',
      icon: 'aliyun'
    },
    children: [
      {
        path: 'app/ccc/google',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: 'app/ccc/codepen',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: 'app/ccc/aliyun',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: 'app/ccc/windows',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
  { 
    path: 'app/fff',
    meta: {
      title: 'medium',
      icon: 'aliyun'
    },
    children: [
      {
        path: 'app/fff/google',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: 'app/fff/codepen',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: 'app/fff/aliyun',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: 'app/fff/windows',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
  { 
    path: 'app/bbb',
    meta: {
      title: 'medium',
      icon: 'aliyun'
    },
    children: [
      {
        path: 'app/bbb/google',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: 'app/bbb/codepen',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: 'app/bbb/aliyun',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: 'app/bbb/windows',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
]