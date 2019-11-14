import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../../../store/types'
import { AppState, updateSideBar } from '../../../store/module/app'
import './index.less'
import Hamburger from './components/hamburger'
import Breadcrumb from './components/breadcrumb'

interface NavBarProps extends AppState {
  avatar: string | null

  updateSideBar: (sidebar: AppState['sidebar']) => void
}

function NavBar({ sidebar, updateSideBar }: NavBarProps) {

  const onTrigger = useCallback(() => {
    updateSideBar({
      ...sidebar,
      opened: !sidebar.opened
    })
  }, [sidebar, updateSideBar])

  return (
    <div className='navbar'>
      <Hamburger isActive={sidebar.opened} onTrigger={onTrigger} />
      <Breadcrumb />
    </div>
  )
}

export default connect(({ app, user: { avatar } }: IStoreState) => ({ ...app, avatar }), {
  updateSideBar
})(NavBar)