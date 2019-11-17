import React from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../store/types'
import classnames from 'classnames'
import './index.less'
import Sidebar from '../components/sidebar/index'
import { Settings } from '../store/module/settings'
import Header from '../components/header'

interface LayoutProps {

  layout: Settings['layout']
}



function Layout(props: LayoutProps) {


  // const closeSideBar = () => {
  //   props.updateSideBar({
  //     ...props.sidebar,
  //     opened: false
  //   })
  // }

  return (
    <section className={
      classnames({
        'layout': true,
        'layout--side-bar': props.layout === 'side'
      })
    }>
      {/* {
        props.device === 'mobile' && props.sidebar.opened ? (<div className="drawer-bg" onClick={closeSideBar} />) : null
      } */}

      { 
        props.layout === 'side' && <Sidebar />
      }
      <section className={
        classnames('layout__main') 
      }>
        <Header />
      </section>
    </section>
  )
}


export default connect(({ settings: { layout } }: IStoreState) => ({ layout }))(Layout)