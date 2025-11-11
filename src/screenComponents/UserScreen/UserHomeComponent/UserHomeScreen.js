import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductCategories from './ProductComponent/ProductCategories'

function UserHomeScreen() {
   // Background Image
      const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768); 
      handleResize();  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    <div className=''>
      <div
      className='h-screen'
       style={{
          backgroundImage: `url(${isMobile ? "/assets/HomeBgImgMobile.jpg" : "/assets/HomeBgImg.jpg"})`,
          backgroundSize: "cover",
          // height:"500px",
          backgroundRepeat: "no-repeat",
        }}>
          <div className=' flex flex-col h-full md:pr-32 justify-center items-center text-center font-semibold'>
            <p className='text-primary-200 font-serif md:text-6xl text-4xl'>
            THE BEST PLACE 
            <br/>TO <br/>
              SATISFY YOUR TUMMY</p>
          <p className='pt-11 font-serif font-semibold md:text-5xl text-3xl text-orange-500'>Up To 30% OFF</p>
          <Button className='btn-primary mt-10'>Shop Now</Button>
          </div>         
      </div>
      <ProductCategories />
    </div>
  )
}

export default UserHomeScreen
