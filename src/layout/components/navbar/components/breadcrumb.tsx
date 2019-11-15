import React, { memo } from 'react'
import './breadcrumb.less'
import { withRouter } from 'react-router-dom'


function Hamburger (props: any) {
  
  console.log(props)

  // console.log(match)
  return (
    <div className='breadcrumb-container' >
   
    </div>
  )
}

export default withRouter(memo(Hamburger))