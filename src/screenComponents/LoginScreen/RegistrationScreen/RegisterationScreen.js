import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectAuth } from '../../../redux/selectors/authSelector'
import { RQUserRegistrationAPI } from '../../../reactQuery/apis/rqAuthAPI'
import toast from 'react-hot-toast';

const RegisterationScreen = () => {
    // Background Image
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    // Form Layout
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const navigate = useNavigate();
    const auth = useSelector(selectAuth);
    const token = auth?.tokenData;

    const { mutate: registerUser, isLoading } = RQUserRegistrationAPI({
        onSuccess: response => {
            if (response) {
                console.log('Register successfully');
                toast.success('Registration Successful !!');
                navigate('/');
            } else {
                toast.error(response?.message || 'Something went wrong');
            }
        },
        onError: error => {
            toast.error(error?.message);
        },
    });

    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setMobile(value);

        // Validation using regex
        const mobileRegex = /^[6-9]\d{9}$/;

        if (value === "") {
            setError("");
        } else if (!mobileRegex.test(value)) {
            setError("Enter valid 10 digit mobile number starting from 6-9");
        } else {
            setError("");
        }
    };

    const onSubmit = data => {
        const submitData = {
            ...data,
        };
        registerUser(submitData);
        // reset();
    };

    return (
        <div className="flex flex-col md:justify-center items-center md:pr-96  md:pt-0 pt-14 w-full "
            style={{
                backgroundImage: `url(${isMobile ? "/assets/LoginBgImgMobile.jpg" : "/assets/LoginBgImg.jpg"})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>

            {/* Logo Section */}
            <div className="md:mb-8">
                <Link
                    to="/layout/userhome"
                    className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                >
                    <img alt='Logo' src='/assets/logo.png'
                        className='md:h-24 h-16 md:w-24 w-16'
                    />
                    <span className="ml-3 md:text-6xl text-3xl text-primary-200 font-serif font-semibold">Pizza Palace</span>
                </Link>
            </div>

            <div className='w-full flex items-center justify-center lg:px-0 px-8 pb-8'>
                <Form
                    onFinish={onSubmit}
                    className="border !pb-0 border-primary-50 !text-primary-50 shadow-lg rounded-lg w-full p-4"
                    layout={formLayout}
                    form={form}
                    //   onValuesChange={onFormLayoutChange}
                    style={{ maxWidth: formLayout === 'inline' ? 'none' : 400 }}
                >
                    <h1 className="w-full text-primary-500 flex justify-center items-center font-semibold mb-4 md:text-3xl text-xl">
                        Create Your Account
                    </h1>

                    <Form.Item
                        name="username"
                        label={<span className="lg:text-base text-primary-50">Enter Name</span>}
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={<span className="lg:text-base text-primary-50">Enter Email</span>}
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="mobile"
                        label={<span className="lg:text-base text-primary-50">Enter Mobile</span>}
                        rules={[{ required: true, message: "Please enter mobile number" }]}
                    >
                        <Input
                            placeholder="Mobile"
                            maxLength={10}
                            onChange={handleChange}
                            style={{ padding: 3, fontSize: 16 }}
                        />
                        {error && <p style={{ color: "red" }}>{error}</p>} 
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={<span className="lg:text-base text-primary-50">Enter Password</span>}
                        rules={[{ required: true, message: "Please enter password" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>


                    <Form.Item className="w-full flex justify-center items-center">
                        <Button
                            htmlType="submit"
                            loading={isLoading}
                            className="btn-primary"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </Form.Item>

                    <Form.Item
                        className="w-full flex justify-center text-primary-50 "
                        name="signin"
                    >
                        Alredy have an account?
                        <Link to={"/"}
                            className="text-blue-600">
                            Login
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default RegisterationScreen
