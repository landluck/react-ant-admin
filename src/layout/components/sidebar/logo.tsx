import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './logo.less'


interface LogoProps {
  collapse: boolean
}

const config = {
  title: 'Ant design Pro',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
}

function Logo(props: LogoProps) {


  const wrap = classnames('sidebar-logo-container', {
    collapse: props.collapse
  })

  return (
    <div className={wrap}>
      {
        props.collapse ?
          (
            <Link to="/" className="sidebar-logo-link">
              {
                config.logo ? <img src={config.logo} className="sidebar-logo" alt="logo"></img> : <h1 className="sidebar-title">{config.title}</h1>
              }
            </Link>
          ) :
          (
            <Link to="/" className="sidebar-logo-link">
              {
                config.logo && <img src={config.logo} className="sidebar-logo" alt="logo"></img>
              }
              <h1 className="sidebar-title">{config.title}</h1>
            </Link>
          )
      }
    </div>
  )
}

export default Logo