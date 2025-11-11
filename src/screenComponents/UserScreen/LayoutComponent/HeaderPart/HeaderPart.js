import React, { useState } from 'react'
import { Button, Drawer } from "antd";
import { Link } from 'react-router-dom';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';

const HeaderPart = () => {
  // Mmobile Drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className='bg-primary-200 px-5  w-full shadow-md fixed z-50 '>
      <header className="text-primary-950 body-font">
        <div className=" w-full flex flex-row justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link
              to="/layout/userhome"
              className="flex title-font font-medium items-center md:mt-0 mt-4 text-gray-900 mb-4 md:mb-0"
            >
              <img alt='Logo' src='/assets/logo.png'
                className='md:h-16 h-12 md:w-16 w-12'
              />
              <span className="ml-3 md:text-3xl text-xl font-serif font-semibold">Pizza Palace</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='md:flex hidden'>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <Link to="/layout/userhome" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                Home
              </Link>
              <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                About
              </Link>
              <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                Product
              </Link>
              <Link to="/layout/profile" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                Profile
              </Link>
              <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                Contact
              </Link>
            </nav>
          </div>
          <div className='md:flex hidden'>
            <Button
              type="default"
              className="flex items-center gap-2 mt-4 md:mt-0 btn-primary border-0 md:text-lg font-medium "
            >
              <Link to={'/'}>Logout</Link>
              <LogoutOutlined />
            </Button>
          </div>

          {/* Drawer */}
          <div className='md:hidden flex'>
            <Button type="primary"
            className='bg-primary-800'
            onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer
              title="Menu"
              closable={{ 'aria-label': 'Close Button' }}
              onClose={onClose}
              open={open}
              width={250}
            className='!bg-primary-100'
            >

              {/* Navigation Links */}
              <nav className="md:ml-auto md:mr-auto flex flex-col text-base gap-4">
                <Link to="/layout/userhome" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                  Home
                </Link>
                <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                  About
                </Link>
                <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                  Product
                </Link>
                <Link to="/layout/profile" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                  Profile
                </Link>
                <Link to="#" className="mr-8 hover:text-gray-900 md:text-lg font-medium">
                  Contact
                </Link>
                <div>
                  <Button
                    type="default"
                    className="flex items-center gap-2 mt-4 md:mt-0 btn-primary border-0 md:text-lg font-medium "
                  >
                    <Link to={'/'}>Logout</Link>
                    <LogoutOutlined />
                  </Button>
                </div>
              </nav>
            </Drawer>
          </div>
        </div>
      </header>
    </div>
  )
}

export default HeaderPart
