import React from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../store/types'
import { updateSideBar, AppState } from '../store/module/app'
import { BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames'
import './index.less'
import Sidebar from '../components/sidebar/index'


interface LayoutProps extends AppState {
  updateSideBar: (sidebar: AppState['sidebar']) => void
}



function Layout(props: LayoutProps) {
  const wrapClass = classnames({
    'app-wrap': true,
    'hide-side-bar': !props.sidebar.opened,
    'open-side-bar': props.sidebar.opened,
    'with-out-animation': props.sidebar.withoutAnimation,
    'mobile': props.device === 'mobile'
  })

  const closeSideBar = () => {
    props.updateSideBar({
      ...props.sidebar,
      opened: false
    })
  }

  return (
    <div className={wrapClass}>
      {
        props.device === 'mobile' && props.sidebar.opened ? (<div className="drawer-bg" onClick={closeSideBar} />) : null
      }
      <Router>
        <Sidebar className="sidebar-container"></Sidebar>
      </Router>
    </div>
  )
}


const mapStateToProps = (state: IStoreState) => (state.app)


const mapDispatchToProps = {
  updateSideBar
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout)