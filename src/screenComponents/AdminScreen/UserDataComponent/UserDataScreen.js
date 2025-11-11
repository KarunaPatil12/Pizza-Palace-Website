import React, { useRef } from 'react'
import { Alert, Breadcrumb, Button, Modal, Spin, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redux/selectors/authSelector';
import { RQGetAllUsers } from './../../../reactQuery/apis/rqUserAPI';
import * as XLSX from "xlsx";
import html2pdf from 'html2pdf.js';
import { render } from '@testing-library/react';
import { DownloadOutlined } from '@ant-design/icons';
import { record } from 'zod';


const UserDataScreen = () => {
    const invoiceRef = useRef(null);

    const auth = useSelector(selectAuth);
    const token = auth?.tokenData;

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const { data: users, isLoading, error } = RQGetAllUsers(token);
    // const [downloaduser, setDownloadUser] = useState(null);

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const showModal = (record) => {
    //     setIsModalOpen(true);
    //     setDownloadUser(record);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    if (isLoading) {
        return (
            <div className={'flex justify-center items-center'}>
                <Spin size={'large'} />
            </div>
        );
    }

    if (error) {
        return <Alert message={'Failed to load users'} type={'error'} />;
    }

    const formattedUsers = (users || []).map((user, index) => ({
        key: user.id,
        srno: index + 1,
        name: user.username,
        email: user.email,
        mobile: user.mobile,
        createdOn: new Date(user.createdOn).toLocaleDateString(),
    }));

    const columns = [
        {
            title: 'Sr. No.',
            dataIndex: 'srno',
            key: 'srno',
            width: 50,
            fixed: 'left',
        },
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 180,
            ellipsis: true,
            render: email => (
                <Tooltip title={email}>
                    <span>{email}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            width: 120,
        },
        {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
            width: 120,
        },
        // {
        //     title: 'Download',
        //     dataIndex: 'download',
        //     key: 'download',
        //     width: 50,
        //     render: (_, record) => (
        //         <span>
        //             <DownloadOutlined
        //                 onClick={showModal(record)}
        //             />
        //         </span>
        //     )

        // },

    ];

    const handleDownloadXml = () => {
        const worksheet = XLSX.utils.json_to_sheet(formattedUsers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
        XLSX.writeFile(workbook, "UserData.xlsx");
    };

    const handleDownloadPdf = () => {
        const element = invoiceRef.current;
        const options = {
            margin: 0,
            filename: 'userData.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Generate and save the PDF
        html2pdf()
            .set(options)
            .from(element)
            .save();
    };

    return (
        <div className='section w-full p-4 flex flex-col justify-center items-center'>
            <div className='flex w-full justify-end items-end mb-8 gap-4'>
                <Button onClick={handleDownloadXml} className='btn-primary'>
                    Download To Excel
                </Button>
                <Button onClick={handleDownloadPdf} className='btn-primary'>
                    Download To PDF
                </Button>
            </div>

            <div className={' w-full flex md:justify-between justify-end items-center'}>
            </div>

            <div className={' flex justify-between items-center mb-4'}>
                <h1 className={'title mb-3'}>
                    All Users Data
                </h1>
            </div>

            <div ref={invoiceRef} className={'flex justify-center items-center mt-2 w-full'}>
                <div className={'max-w-[350px] sm:max-w-[800px] md:w-full lg:max-w-full overflow-x-auto '}>
                    <Table
                        className='!bg-primary-100'
                        tableLayout={'fixed'}
                        size={'small'}
                        scroll={{ x: 'max-content' }}
                        columns={columns}
                        rowKey={'key'}
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            onChange: (page, pageSize) => {
                                setPagination({ current: page, pageSize });
                            },
                        }}
                        dataSource={formattedUsers}
                    />
                </div>
            </div>

            {/* <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
            >
                <div>
                    {downloaduser && (
                        <div>
                            <p><strong>Name:</strong> {downloaduser.name}</p>
                            <p><strong>Email:</strong> {downloaduser.email}</p>
                            <p><strong>Mobile:</strong> {downloaduser.mobile}</p>
                            <p><strong>Created On:</strong> {downloaduser.createdOn}</p>
                        </div>
                    )}
                </div>
            </Modal> */}
        </div>
    )
}

export default UserDataScreen
