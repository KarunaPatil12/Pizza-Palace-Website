import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    DatabaseOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProductOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const items = [
    { key: '1', icon: <HomeOutlined />, label: 'Home', link: '/admin/adminhome' },
    {
        key: 'sub1',
        label: 'Product Categories',
        icon: <ProductOutlined />,
        link: '/admin/adminscreen',
    },
    {
        key: 'sub2',
        label: 'User Data',
        icon: <DatabaseOutlined /> ,
        link: '/admin/userdata',
    },
    {
        key: 'sub3',
        label: 'Profile',
        icon: <UserOutlined />,
        link: "/admin/adminprofile",
    },
];

const NavbarScreen = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick = (e) => {
        const clickedItem = items.find((item) => item.key === e.key);
        if (clickedItem && clickedItem.link) {
            navigate(clickedItem.link);
        }
    };

    return (
        <div className=" fixed z-50 !text-primary-200">
            {/* <div className='Subtitle flex justify-center items-center'> Menus</div> */}
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                className='!bg-primary-700 !hover:bg-primary-400 '
                inlineCollapsed={collapsed}
                items={items}
                onClick={handleMenuClick}
            />
        </div>
    );
};

export default NavbarScreen;
