export interface IMenuBase {
  path: string
  component?: string
  meta: IMenuMeta
}

export interface IMenuMeta {
  title: string
  icon?: string
}

export interface IMenu extends IMenuBase {
  children?: IMenu[];
}


const menus: IMenu[] = [
  // 菜单相关路由
  { 
    path: '1',
    meta: {
      title: 'Dashborad',
      icon: 'medium'
    },
    children: [
      {
        path: '2',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: '3',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: '4',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: '5',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
  { 
    path: '8',
    meta: {
      title: 'Dashborad',
      icon: 'medium'
    },
    children: [
      {
        path: '9',
        meta: {
          title: '分析页',
          icon: 'google'
        },
      },
      {
        path: '13',
        meta: {
          title: '分析页',
          icon: 'codepen'
        },
      },
      {
        path: '14',
        meta: {
          title: '监控页',
          icon: 'aliyun'
        },
      },
      {
        path: '15',
        meta: {
          title: '工作台',
          icon: 'windows'
        },
      }
    ]
  },
]

export default menus
