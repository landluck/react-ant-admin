import React from 'react'
import { Icon } from 'antd'
import './hamburger.less'

interface HamburgerProps {
  isActive: boolean
  onTrigger: () => void
}

function Hamburger ({ isActive, onTrigger }: HamburgerProps) {
  return (
    <div className='hamburger-container' onClick={onTrigger}>
      <Icon type={ isActive ? 'menu-fold' : 'menu-unfold'} />
    </div>
  )
}

export default Hamburger