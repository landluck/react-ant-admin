import React, { memo } from 'react'
import { AppState } from '../../store/module/app'
import { connect } from 'react-redux'
import { IStoreState } from '../../store/types'
import classnames from 'classnames'
import { Settings } from '../../store/module/settings'
import NavBar from '../navbar'
import Sidebar from '../sidebar'
import './index.less'

interface HeaderProps {

  fixedHeader: boolean
  contentWidth: Settings['contentWidth']
  layout: Settings['layout']
  sidebar: AppState['sidebar']
  theme: Settings['theme']
}

function Header (props: HeaderProps) {
  return (
    <header className={
      classnames(
        'layout__header',
        'layout__header--' + props.layout,
        'layout__header--' + props.theme,
        {
          'layout__header--fix': props.fixedHeader,
          'layout__header--close': !props.sidebar.opened
        }
      )
    }>
      <div className={
        classnames('layout__header__inner', {
          'layout__header__inner--fixed': props.contentWidth === 'Fixed'
        })
      }>
        {
          props.layout === 'top' && (
            <div className='layout__header--top-side-bar'> <Sidebar /> </div>
          )
        }
        <NavBar />
      </div>

      {/* <tags-view v-if="needTagsView" /> */}
    </header>
  )
}

export default connect(({ settings, app: { sidebar }}: IStoreState) => ({ ...settings, sidebar }))(memo(Header))