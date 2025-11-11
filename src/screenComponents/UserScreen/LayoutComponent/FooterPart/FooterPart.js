import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterPart = () => {
    return (
        <div>
            <Footer className='bg-primary-200 text-primary-950'>
                <div className='flex md:flex-row flex-col justify-between items-center text-center'>
                    {/* Logo Section */}
                    <div>
                        <Link
                        to="/layout/userhome"
                        className="flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0"
                    >
                        <img alt='Logo' src='/assets/logo.png'
                            className='md:h-20 h-12 md:w-20 w-12'
                        />
                        <span className="md:ml-3 text-primary-950 md:text-3xl text-xl font-serif font-semibold">Pizza Palace</span>
                    </Link>
                    </div>

                    <div className='md:text-lg text-base mb-2 md:mb-0'>
                        <p>All right reserved @Pizza Palace</p>
                    </div>

                    <div className='flex text-2xl gap-3 mb-2 md:mb-0'>
                        <FacebookFilled />
                        <InstagramFilled />
                        <TwitterSquareFilled />
                    </div>
                    
                </div>
            </Footer>
        </div>
    )
}

export default FooterPart
