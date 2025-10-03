import React from 'react'
import Slider, { Settings } from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import NextArrow from './Testimonial/NextArrow';
import PrevArrow from './Testimonial/PrevArrow';
import Link from 'next/link';


const TestimonialSection = () => {

    interface Data {
        name: string;
        review: string;
        img: string;
        role: string
    }

    const settings: Settings = { // Type the settings object
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        lazyLoad: "ondemand",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2,
            //     initialSlide: 2
            //   }
            // },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const data: Data[] = [
        {
            name: "Eskedar Yeshitila",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos neque veniam iste, qui laboriosam provident exercitationem impedit quia rem, sed commodi! Animi voluptate adipisci, non accusamus corrupti enim itaque?",
            img: "/helena.jpg",
            role: "Social media manager"
        },
        {
            name: "Gedion Takele",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos neque veniam iste, qui laboriosam provident exercitationem impedit quia rem, sed commodi! Animi voluptate adipisci, non accusamus corrupti enim itaque?",
            img: "/franklin.jpg",
            role: "Marketing manager"
        },
        {
            name: "Olyad Melese",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos neque veniam iste, qui laboriosam provident exercitationem impedit quia rem, sed commodi! Animi voluptate adipisci, non accusamus corrupti enim itaque?",
            img: "/john.jpg",
            role: "Entreprenur"
        },
        {
            name: "Lemi Zewde",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos neque veniam iste, qui laboriosam provident exercitationem impedit quia rem, sed commodi! Animi voluptate adipisci, non accusamus corrupti enim itaque?",
            img: "/jeffrey.jpg",
            role: "Entreprenur"
        },
        {
            name: "Abenezer Tasew",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eos neque veniam iste, qui laboriosam provident exercitationem impedit quia rem, sed commodi! Animi voluptate adipisci, non accusamus corrupti enim itaque?",
            img: "/victor.jpg",
            role: "Graphics designer"
        },
    ]

    return (

        <div className='mt-10'>
            <div className='flex flex-col lg:flex-row lg:justify-around items-center '>
                <div className='flex flex-col items-center'>
                    <p className='font-semibold'>Our community's reaction</p>
                </div>
                <div className='w-[240px] md:w-[600px] mt-5 lg:mt-0'>
                    <Slider {...settings}>
                        {data.map(rev => (
                            <div className='p-2 shadow-2xl '>
                                <div>
                                    <p className='line-clamp-3'>{rev.review}</p>
                                </div>
                                <div className='flex gap-2 mt-2'>
                                    <Image
                                        src={rev.img}
                                        width={30}
                                        height={30}
                                        alt="avatar"
                                        className='rounded-full' />
                                    <div className=''>
                                        <p className='text-sm'>{rev.name}</p>
                                        <p className='text-gray-700 italic text-xs leading-0.5 md:leading-1.5'>{rev.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className='mt-10 flex justify-center'>
                <Link className="bg-sky-600  text-white cursor-pointer px-2 py-1 mt-2 rounded-lg" href="/books">Start Today</Link>
            </div>
        </div>

    )
}

export default TestimonialSection
