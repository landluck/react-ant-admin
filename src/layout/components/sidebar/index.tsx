import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Logo from './logo'
import { IStoreState } from '../../../store/types'
import { AppState } from '../../../store/module/app'
import { IRoute } from '../../../router/config'
import { Menu } from 'antd'
import renderMenu from './sideMenu'


interface BarProps extends AppState {
  sidebarLogo: boolean
}

function Bar({ sidebarLogo, sidebar, routes }: BarProps) {

  const wrap = classnames('sidebar-container', sidebar.theme, {
    'has-logo': sidebarLogo
  })

  return (
    <div className={wrap}>
      {
        sidebarLogo && <Logo collapse={!sidebar.opened} />
      }
      <Menu
        mode={sidebar.mode}
        theme={sidebar.theme}
        inlineCollapsed={!sidebar.opened}
      >

        {
          routes.map((menu: IRoute) => (
            renderMenu(menu)
          ))
        }

      </Menu>
    </div>
  )
}

export default connect(({ settings: { sidebarLogo }, app }: IStoreState) => ({ sidebarLogo, ...app }))(Bar)