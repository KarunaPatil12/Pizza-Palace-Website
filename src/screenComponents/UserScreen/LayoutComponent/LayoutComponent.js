import React from 'react'
import { Outlet } from 'react-router-dom'
import { FooterPart } from './FooterPart'
import HeaderPart from './HeaderPart/HeaderPart';

function LayoutComponent() {
  return (
    <div>
      <HeaderPart />
    <div className='lg:pt-16 pt-20'>
        <Outlet />
    </div>
      <FooterPart />
    </div>
  )
}

export default LayoutComponent
