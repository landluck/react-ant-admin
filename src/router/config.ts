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
      title: '首页',
      icon: 'shopping'
    },
    children: [
      {
        path: '2',
        meta: {
          title: '首页',
          icon: 'shopping'
        },
      }
    ]
  },
  {
    path: '5',
    meta: {
      title: 'item 1',
      icon: 'shopping'
    }
  }
]

export default menus
