import React from 'react'
import NavbarScreen from './NavbarScreen'
import { Link, Outlet } from 'react-router-dom'
import { Button, Layout, } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import { LogoutOutlined } from '@ant-design/icons'

const AdminlayoutScreen = () => {
    return (
        <div className='flex flex-row gap-52'>
            <Layout>
                <Header
                    className='!bg-primary-700 sticky top-0 z-50 lg:px-4 px-2 flex justify-center items-center'>
                    <div className='w-full flex items-center'>
                            <img alt='Logo' src='/assets/logo.png'
                                className='md:h-16 h-12 md:w-16 w-12'
                            />
                            <span className="ml-3 md:text-3xl text-xl text-primary-200 font-serif font-semibold">Pizza Palace</span>
                    </div>
                    <div className='flex gap-4'>
                        <div className=' md:text-base font-serif text-sm opacity-70  text-primary-100 items-center text-center'>Admin DashBoard </div>
                        <div className='w-full flex justify-center items-center pt-2'>
                            <Button
                                type="default"
                                className="flex items-center gap-2 mt-4 md:mt-0 btn-primary border-0 md:text-lg font-medium "
                            >
                                <Link to={'/'}>Logout</Link>
                                <LogoutOutlined />
                            </Button>
                        </div>
                    </div>
                </Header>

                <Layout>
                    <Sider trigger={null} className='!bg-primary-700 pt-8'>
                        <NavbarScreen />
                    </Sider>
                    <Content className='!bg-primary-50'><Outlet /></Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminlayoutScreen;
