import React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'

import Logo from './logo'
import { IStoreState } from '../../store/types'
import { AppState } from '../../store/module/app'
import menus, { IMenu } from '../../router/config'
import SideMenuItem from './side-menu-item'


interface BarProps extends AppState {
  sidebarLogo: boolean
  className: string
}

function Bar({ sidebarLogo, sidebar, className }: BarProps) {
  return (
    <div className={sidebarLogo ? 'has-logo ' + className : className}>
      {
        sidebarLogo && <Logo collapse={!sidebar.opened} />
      }
      <Menu
        mode={sidebar.mode}
        theme={sidebar.theme}
        inlineCollapsed={sidebar.opened}
      >

        {
          menus.map((item: IMenu) => (
        
            <SideMenuItem menu={item} key={item.path} />
          ))
        }

      </Menu>
    </div>
  )
}

export default connect(({ settings: { sidebarLogo }, app }: IStoreState) => ({ sidebarLogo, ...app }))(Bar)