import React, { memo } from 'react'
import { Icon } from 'antd'
import './index.less'

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

export default memo(Hamburger)