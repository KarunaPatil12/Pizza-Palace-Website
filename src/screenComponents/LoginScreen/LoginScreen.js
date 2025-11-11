import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RQUserLoginAPI } from "../../reactQuery/apis/rqAuthAPI";
import { loginSuccess , loginStart } from "../../redux/authAction";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Background Image
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { mutate: loginUser, isLoading } = RQUserLoginAPI({
    onSuccess: (response) => {
      if (response?.token) {
        const decodedToken = jwtDecode(response.token);
        const userRole = decodedToken?.role;
        const userId = decodedToken?.userId;

        dispatch(loginSuccess({ ...response, role: userRole, id: userId }));

        if (userRole === "ADMIN") {
          toast.success("Admin logged in successfully!");
          navigate("/admin/adminhome");
        } else if (userRole === "USER") {
          toast.success("User logged in successfully!");
          navigate("/layout/userhome");
        }
      } else {
        toast.error(response?.message || "Access denied.");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed.");
    },
  });

  const onFinish = (values) => {
    console.log("Form Values:", values);
    loginUser(values);
    dispatch(loginStart(values));
  };

  return (
    <div className="flex flex-col md:justify-center  items-center md:pr-96 md:pt-0 pt-20 w-full h-screen"
      style={{
        backgroundImage: `url(${isMobile ? "/assets/LoginBgImgMobile.jpg" : "/assets/LoginBgImg.jpg"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
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

      <div className="w-full flex items-center justify-center lg:px-0 px-8">
        <Form
          className="border border-[#CCDDE3] shadow-lg rounded-lg w-full md:p-4 p-6"
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            className="pt-4"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}>
            <Input className="hover:shadow-md " placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            style={{ marginBottom: 2 }}
            rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input className=" hover:shadow-md" prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item
            className="w-full flex justify-end text-blue-600 !hover:text-blue-700"
            name="forgot">
            <Link to={"/"}>
              Forgot Password
            </Link>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 4 }}
            className="w-full flex justify-center items-center"
          >
            <Button htmlType="submit"
              className="btn-primary text-lg text-white font-semibold bg-[#89888a] !hover:bg-transparent  p-4 flext items-center justify-center"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>

          <Form.Item
            className="w-full flex justify-center text-primary-50 "
            name="signin"
          >
            Don't have an account?s
            <Link to={"/register"}
              className="text-blue-600">
              Sign in
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;