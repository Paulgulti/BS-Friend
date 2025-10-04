import React from 'react'
// import Slider, { Settings } from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
// import NextArrow from './Testimonial/NextArrow';
// import PrevArrow from './Testimonial/PrevArrow';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';


const TestimonialSection = () => {

    interface Data {
        id: number;
        name: string;
        review: string;
        img: string;
        role: string
    }


    // const settings: Settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     lazyLoad: "ondemand",
    //     nextArrow: <NextArrow />,
    //     prevArrow: <PrevArrow />,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1,
    //                 infinite: true,
    //                 dots: true
    //             }
    //         },
    //         {
    //             breakpoint: 765,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]
    // };

    const data: Data[] = [
        {
            id: 1,
            name: "Eskedar Yeshitila",
            review: "This app combines Bible reading, note-taking, and an AI chatbot that answers questions instantly—perfect for both daily devotionals and deeper study",
            img: "/helena.jpg",
            role: "Social media manager"
        },
        {
            id: 2,
            name: "Gedion Takele",
            review: "Makes studying the Bible simple and interactive—love how the AI chatbot explains verses clearly!",
            img: "/franklin.jpg",
            role: "Marketing manager"
        },
        {
            id: 3,
            name: "Olyad Melese",
            review: "A beautifully designed Bible study app that makes scripture more engaging and accessible. The built-in AI chatbot feels like a personal guide for deeper understanding.",
            img: "/john.jpg",
            role: "Entreprenur"
        },
        {
            id: 4,
            name: "Lemi Zewde",
            review: "Finally an app that combines reading, note-taking, and smart guidance in one place. Super helpful!",
            img: "/jeffrey.jpg",
            role: "Entreprenur"
        },
        {
            id: 5,
            name: "Abenezer Tasew",
            review: "This Bible study app feels like having a study partner 24/7. The AI chatbot is a game-changer.",
            img: "/victor.jpg",
            role: "Graphics designer"
        },
    ]

    return (

        <div className='mt-10 '>
            <div className='flex flex-col lg:flex-row lg:justify-around items-center '>
                <div className='flex flex-col items-center'>
                    <p className={`font-semibold text-xl`}>Our community's reaction</p>
                </div>
                <Carousel className='w-[220px] md:w-[590px] mt-5 lg:mt-0'>
                    <CarouselContent>
                        {/* <Slider {...settings}> */}
                        {data.map(rev => (
                            <CarouselItem
                                key={rev.id} 
                                className='shadow-xl md:basis-1/2 lg:basis-1/2 px-4'>
                                <div>
                                    <p className='line-clamp-5 text-sm'>{rev.review}</p>
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
                            </CarouselItem>
                        ))}
                        {/* </Slider> */}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className='mt-10 flex justify-center'>
                <Link className="bg-sky-600  text-white cursor-pointer px-2 py-1 mt-2 rounded-lg" href="/books">Start Today</Link>
            </div>
        </div>

    )
}

export default TestimonialSection
