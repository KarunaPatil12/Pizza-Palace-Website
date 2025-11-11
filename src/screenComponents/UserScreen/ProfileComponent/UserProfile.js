import { Alert, Avatar, Button, Card, Divider, Form, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectAuth } from './../../../redux/selectors/authSelector';
import { RQGetProfileAPI, RQUpdateUserProfileAPI } from '../../../reactQuery/apis/rqAuthAPI';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const auth = useSelector(selectAuth);
    const token = auth?.tokenData;
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.userId;
    const { data: profileDetails, isLoading, refetch, error } = RQGetProfileAPI(id, token);

    const { mutate: updateProfile } = RQUpdateUserProfileAPI({
        onSuccess: response => {
            if (response) {
                refetch();
                setIsEditing(false);
                toast.success('Profile Updated Successfully...!');
            } else {
                toast.error(response?.message || 'Something went wrong...!');
            }
        },
        onError: error => {
            toast.error(error?.message);
        },
    });

    useEffect(() => {
        if (profileDetails) {
            form.setFieldsValue(profileDetails);
        }
    }, [profileDetails, form]);

    const onFinish = values => {
        updateProfile({
            token,
            formData: values,
            id: decodedToken?.userId,
        });
    };

    if (isLoading) {
        return (
            <div className={'flex justify-center items-center h-full'}>
                <Spin size={'large'} />
            </div>
        );
    }
    if (error) {
        return <Alert message = {'Failed to load users'} type={'error'} />;
    }

    return (
        <div className={'w-full  flex justify-center items-center p-4'}>
            <div className={'flex flex-col w-full  pb-10 h-full section'}>
                <div className={'flex justify-between'}>
                    <h1 className={'title font-bold font-serif md:mb-8 mb-4'}>
                        Your Account
                    </h1>
                </div>
                <div className={'w-full flex justify-center items-center'}>
                    <Card className={'md:w-1/3 w-full'}>
                        <Form
                            form={form}
                            layout={'horizontal'}
                            onFinish={onFinish}
                            initialValues={profileDetails}>
                            <div className={'flex text-centers items-center md:mb-6'}>
                                <div className={'md:flex flex flex-row md:items-center gap-2 md:gap-4'}>
                                    <Avatar size={64} className='!bg-primary-500'>
                                        {profileDetails?.username?.[0]}
                                    </Avatar>
                                    <div>
                                        <p className={'text-gray-600 text-xs text-[#535353]'}>{decodedToken?.role}</p>
                                        <p className={'font-semibold md:text-xl'}>{profileDetails?.username}</p>
                                        <p className={'text-base text-[#535353] font-medium'}>{profileDetails?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <Divider className=' bg-primary-200'/>

                            <div className={'flex flex-col md:ml-8 ml-4'}>
                                <Form.Item label={' Name'} name={'username'} className={'font-medium '} rules={[{ required: true, message: 'Please input your First Name!' }]}>
                                    <Input disabled={!isEditing} className={isEditing ? '!bg-transparent !text-black' : '!bg-primary-50 !text-[#555555] border-none text-base'} />
                                </Form.Item>

                                <Form.Item label={'Mobile'} name={'mobile'} className={'font-medium'} rules={[{ required: true, message: 'Please input your Mobile!' }]}>
                                    <Input disabled={!isEditing} className={isEditing ? '!bg-transparent !text-black' : '!bg-primary-50 !text-[#555555] border-none text-base'} />
                                </Form.Item>

                                <Form.Item label={'Email'} name={'email'} className={'font-medium'} rules={[{ required: true, message: 'Please input your Mobile!' }]}>
                                    <Input disabled={!isEditing} className={isEditing ? '!bg-transparent !text-black' : '!bg-primary-50 !text-[#555555] border-none text-base'} />
                                </Form.Item>
                            </div>

                                <div className={'flex gap-2 md:gap-4  md:ml-8 ml-2'}>
                                    {!isEditing && (
                                        <Button type={'primary'}
                                            className={'bg-primary-800 px-10 hover:!bg-primary-700 font-medium'}
                                            onClick={() => setIsEditing(true)}>
                                            Edit
                                        </Button>
                                    )}
                                </div>

                            {isEditing && (
                                <div className={'flex justify-end gap-4 mt-2 '}>
                                    <Button
                                        className={'hover:!text-primary-700 hover:!border-primary-700'}
                                        onClick={() => {
                                            form.resetFields();
                                            form.setFieldsValue(profileDetails);
                                            setIsEditing(false);
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button htmlType={'submit'} type={'primary'} className={'bg-primary-800 hover:!bg-primary-700 text-primary-50'}>
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserProfile
