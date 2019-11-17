import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import Logo from '../logo'
import { IStoreState } from '../../store/types'
import { AppState } from '../../store/module/app'
import { IRoute } from '../../router/config'
import { Menu } from 'antd'
import renderMenu from '../side-menu'
import './index.less'
import { Config } from '../../config'
import { Settings } from '../../store/module/settings'

interface BarProps extends Settings {
  
  sidebar: AppState['sidebar']
  routes: AppState['routes']
}

function Bar({ theme, layout, sidebar, routes }: BarProps) {


  const inlineCollapsed: {
    inlineCollapsed?: boolean
  } = {}

  if (layout === 'side') {
    inlineCollapsed.inlineCollapsed = !sidebar.opened
  }

  return (
    <aside className=
      {
        classnames(
          'layout__side-bar',
          'layout__side-bar--' + theme,
          'layout__side-bar--' + layout,
          {
            'layout__side-bar--close': !sidebar.opened
          }
        )
      }
    >
      <div className={'layout__side-bar__logo--' + layout}>
        <Logo opened={!sidebar.opened} />
      </div>
      <div className='layout__side-bar__menu'>
        <Menu
          mode={layout === 'side' ? 'inline' : 'horizontal'}
          theme={theme}
          {
            ...inlineCollapsed
          }
        >

          {
            routes.map((menu: IRoute) => (
              renderMenu(menu)
            ))
          }

        </Menu>
      </div>
    </aside>
  )
}

export default connect(({ settings, app: { sidebar, routes } }: IStoreState) => ({ ...settings, sidebar, routes}))(Bar)