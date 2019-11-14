import React from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../store/types'
import { updateSideBar, AppState } from '../store/module/app'
import { BrowserRouter as Router } from 'react-router-dom'
import classnames from 'classnames'
import './index.less'
import Sidebar from './components/sidebar/index'
import NavBar from './components/navbar/index'


interface LayoutProps extends AppState {

  tagsView: boolean

  fixedHeader: boolean

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

  const mainClass = classnames('main-container', {
    'tag-view': props.tagsView
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
        <Sidebar />
        <div className={mainClass}>
          <div className={ props.fixedHeader ? 'fixed-header' : ''}>
            <NavBar />
            {/* <tags-view v-if="needTagsView" /> */}
          </div>
        </div>
      </Router>
    </div>
  )
}


const mapStateToProps = ({ app, settings: { tagsView, fixedHeader }}: IStoreState) => ({...app, tagsView, fixedHeader})


const mapDispatchToProps = {
  updateSideBar
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout)