import React, { memo } from 'react'
import { Icon } from 'antd'

interface HelpProps {
  href: string
  className: string
}

function Help({ href, className }: HelpProps) {
  return (
    <a className={className} href={href} target="blank"><Icon type="question-circle" /></a>
  )
}

export default memo(Help)