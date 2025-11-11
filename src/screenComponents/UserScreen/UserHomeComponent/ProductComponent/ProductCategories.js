import { Card } from 'antd';
import React from 'react'

const ProductCategories = () => {
    const pizzaMenu = [
        {
            category: "Pizzas",
            types: {
                vegetarian: [
                    {
                        id: 1,
                        name: "Veggie Supreme Pizza",
                        image: "/assets/veggie-supreme.jpg",
                    },
                    {
                        id: 2,
                        name: "Paneer Pizza",
                        image: "/assets/paneerPizza.jpg",
                    },
                    {
                        id: 3,
                        name: "Cheese Lovers Pizza",
                        image: "/assets/cheese-lovers.jpg",
                    },
                    {
                        id: 4,
                        name: "Spinach & Mushroom Pizza",
                        image: "/assets/spinach-mushroom.jpg",
                    },
                    {
                        id: 5,
                        name: "Corn Pizza",
                        image: "/assets/corn-pizza.jpg",
                    },
                    {
                        id: 6,
                        name: "Mexican Pizza (Veg)",
                        image: "/assets/MexicanPizza.jpg",
                    },
                ],
                nonVegetarian: [
                    {
                        id: 1,
                        name: "Pepperoni Pizza",

                        image: "/assets/pepperoni.jpg",
                    },
                    {
                        id: 2,
                        name: "BBQ Chicken Pizza",
                        image: "/assets/bbq-chicken.jpg",
                    },
                    {
                        id: 3,
                        name: "Tandoori Chicken Pizza",
                        image: "/assets/tandoori-chicken.jpg",
                    },
                    {
                        id: 4,
                        name: "Meat Lovers Pizza",
                        image: "/assets/meat-lovers.jpg",
                    },
                    {
                        id: 5,
                        name: "Seafood Pizza",
                        image: "/assets/seafood.jpg",
                    },
                    {
                        id: 6,
                        name: "Mexican Pizza(Non-Veg)",
                        image: "/assets/MexicanPizza(Non-Veg).jpg",
                    },
                ],
            },
        },
    ];

    return (
        <div className='w-full p-4 flex flex-col justify-center  items-center'>
            <div className='w-full section'>
                <div className='w-full my-10'>
                    <h1 className='title'>Vegetarian Pizza</h1>
                </div>
                <div className='flex justify-center items-center text-center'>
                    <div className='grid text-center lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-20 gap-6'>
                        {pizzaMenu[0].types.vegetarian.map((pizza, index) => (
                            <Card
                                key={pizza.id}
                                style={{ width: 220, height: 250 }}
                                className="!border-none !bg-transparent md:mb-2 mb-14"
                                cover={
                                    <img
                                        draggable={false}
                                        className="!rounded-full hover:shadow-xl transform transition-all duration-300 hover:scale-105 shadow-primary-300"
                                        style={{ width: '220px', height: '220px' }}
                                        alt={pizza.name}
                                        src={pizza.image}
                                    />
                                }>
                                <h2 className='Subtitle align-middle '>{pizza.name}</h2>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className='w-full my-10 pt-20'>
                    <h1 className='title'>Non - vegetarian Pizza</h1>
                </div>
                <div className='flex justify-center items-center text-center'>
                    <div className='grid text-center lg:grid-cols-4 md:grid-cols-3 grid-cols-1 md:gap-20 gap-6'>
                        {pizzaMenu[0].types.nonVegetarian.map((pizza, index) => (
                            <Card
                                key={pizza.id}
                                style={{ width: 220, height: 250 }}
                                className="!border-none !bg-transparent md:mb-2 mb-14"
                                cover={
                                    <img
                                        draggable={false}
                                        className="!rounded-full hover:shadow-xl transform transition-all duration-300 hover:scale-105 shadow-primary-300"
                                        style={{ width: '220px', height: '220px' }}
                                        alt={pizza.name}
                                        src={pizza.image}
                                    />
                                }
                            >
                                <h2 className='Subtitle align-middle mb-8'>{pizza.name}</h2>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductCategories
