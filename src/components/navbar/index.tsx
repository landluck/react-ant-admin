import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../../store/types'
import { AppState, updateSideBar } from '../../store/module/app'
import { Settings } from '../../store/module/settings'
import './index.less'
import Hamburger from '../hamburger'
import Breadcrumb from '../breadcrumb'

interface NavBarProps extends AppState {
  avatar: string | undefined

  layout: Settings['layout']

  updateSideBar: (sidebar: AppState['sidebar']) => void
}

function NavBar({ sidebar, updateSideBar, layout }: NavBarProps) {

  const onTrigger = useCallback(() => {
    updateSideBar({
      ...sidebar,
      opened: !sidebar.opened
    })
  }, [sidebar, updateSideBar])

  return (
    <div className='layout__navbar'>
      {
        layout === 'side' && (
          <div className='layout__navbar__nav'>
            <Hamburger isActive={sidebar.opened} onTrigger={onTrigger} />
            <Breadcrumb />
          </div>
        )
      }

      <div className='layout__navbar__menu'>
        
        {/* 搜索暂时不做 */}
        {/* <Search></Search> */}
      </div>

    </div>
  )
}

export default connect(({ app, user: { avatar }, settings: { layout } }: IStoreState) => ({ ...app, avatar, layout }), {
  updateSideBar
})(NavBar)