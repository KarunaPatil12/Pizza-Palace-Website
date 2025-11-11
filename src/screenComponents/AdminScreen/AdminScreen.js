import React from 'react'
import ProductCategories from '../UserScreen/UserHomeComponent/ProductComponent/ProductCategories'
import { UserDataScreen } from './UserDataComponent'

const AdminScreen = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center text-center'>
      <ProductCategories />
    </div>
  )
}

export default AdminScreen
