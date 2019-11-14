import React from 'react'
import { Menu, Icon } from 'antd'
import { IMenu, IMenuMeta } from '../../router/config'
import { Link } from 'react-router-dom'


interface SideMenuItemProps {
  menu: IMenu
}

function renderTitle(meta: IMenuMeta) {
  return (
    <span>
      {meta.icon && <Icon type={meta.icon}></Icon>}
      <span className='menu-title'> {meta.title} </span>
    </span>
  )
}

function MenuItem ({ menu }: { menu: IMenu}) {
  return (
    <Menu.Item key={menu.path}>
      <Link to={menu.path}>
        {
          renderTitle(menu.meta)
        }
      </Link>
    </Menu.Item>
  )
}

function SubMenu({ menu } : { menu: IMenu }) {
  return (
    <Menu.SubMenu title={renderTitle(menu.meta)} key={menu.path}>
      {
        menu.children!.map((route: IMenu) => ( <SideMenuItem menu={route} key={route.path}></SideMenuItem>))
      }
    </Menu.SubMenu>
  )
}


function SideMenuItem({ menu }: SideMenuItemProps) {
  console.log(menu)
  return (
    <>
      {

        menu.children ? <SubMenu menu={menu}></SubMenu> : <MenuItem menu={menu}></MenuItem>

      }
    </>
  )
}

export default SideMenuItem