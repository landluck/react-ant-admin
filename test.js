

const routes = [
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

const result = []


routes.forEach(item => {
  console.log(item)
  result.push( SideMenuItem(item))
})

console.log(result)


function SideMenuItem(item) {
  if (item.children) {
    return SubMenu(item)
  }
  return MenuItem(item)
}

function SubMenu (item) {
  let child = ''

  for (let i =0 ; i < item.children.length; i++) {
    child += MenuItem(item[i])
  }

  return '<Menu.SubMenu>' + child  +  '</Menu.SubMenu>'
}

function MenuItem (item) {
  return '<Menu.Item>' +  '</Menu.Item>'
}
