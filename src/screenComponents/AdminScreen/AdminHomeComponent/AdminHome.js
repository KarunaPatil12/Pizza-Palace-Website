import { RiseOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Divider } from 'antd';
import React, { useEffect, useState } from 'react'
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdminHome() {
    const targetValue = 80;
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => {
                if (prev < targetValue) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 20);

        return () => clearInterval(interval);

    }, []);

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jully", "Aug", "Sept", "Oct", "Nov"],
        datasets: [
            {
                label: " Sales",
                data: [30, 90, 110, 200, 380, 260, 350, 250, 300, 450, 150],
                backgroundColor: "#570902"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div >
            <div className='section flex justify-center items-center  gap-10'>
                <div className='flex flex-col text-primary-50 py-4 justify-center items-center text-center shadow-md bg-gradient-to-r from-blue-600 to-cyan-500 w-[300px]'>
                    <UserOutlined className='text-4xl' />
                    <h2 className='lg:text-5xl text-2xl font-semibold py-2'>1500+</h2>
                    <h1 className='lg:text-xl text-lg '>Total User</h1>
                </div>

                <div className='flex flex-col text-primary-50 py-4 justify-center items-center text-center shadow-md bg-gradient-to-r from-[#61D369] to-[#95E1A3] w-[300px]'>
                    <ShoppingOutlined className='text-4xl' />
                    <h2 className='lg:text-5xl text-2xl font-semibold py-2'>700+</h2>
                    <h1 className='lg:text-xl text-lg '>Total Orders</h1>
                </div>

                <div className='flex flex-col text-primary-50 py-4 justify-center items-center text-center shadow-md bg-gradient-to-r from-[#FA9727] to-[#fcb355] w-[300px]'>
                    <RiseOutlined className='text-4xl' />
                    <h2 className='lg:text-5xl text-2xl font-semibold py-2'>600+</h2>
                    <h1 className='lg:text-xl text-lg'>Total Sales</h1>
                </div>

            </div>

            <div className='grid grid-cols-4 mb-10 h-[500px] mx-10 ga0-10'>
                <div className="col-span-1 h-80 border mr-14 border-primary-400 rounded-lg shadow-sm p-4 flex flex-col  ">
                    <h2 className="text-lg font-semibold">Task</h2>
                    <p className="text-sm text-gray-500">Complete</p>
                    <Divider />

                    <div className="w-32 my-4">
                        <CircularProgressbar
                            value={value}
                            text={`${value}%`}
                            strokeWidth={8}
                            styles={buildStyles({
                                pathColor: "#80554b",
                                textColor: "#1f2937",
                                trailColor: "#e5e7eb",
                            })}
                        />
                    </div>

                    <div className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-3 h-3 border border-primary-600 rounded-full"></span>
                        Completeds
                    </div>
                </div>

                <div className='h-80 w-full col-span-3 flex'>
                    <div className=" p-4 w-full  bg-white shadow rounded">
                        <div className='w-full flex items-center'>
                            <img alt='Logo' src='/assets/logo.png'
                                className='md:h-9 h-4 md:w-9 w-4'
                            />
                            <span className="ml-3 md:text-2xl text-xl font-serif font-semibold">Pizza Palace</span>
                        </div>
                        <Bar className='text-primary-800 h-full ' data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome
