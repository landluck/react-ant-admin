import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './logo.less'


interface LogoProps {
  collapse: boolean
}

const config = {
  title: 'Iny mini manage',
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
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