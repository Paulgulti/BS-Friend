import Image from 'next/image'
import React from 'react'
import bible from '../public/Bible.svg'
import note from '../public/Note.svg'
import bot from '../public/Bot.svg'

const FeaturesSection = () => {


    return (
        <div>
            <h2 className={`font-semibold md:text-xl text-center mb-3`}>Learn, Reflect, and Grow</h2>
            <div className='flex flex-col md:flex-row gap-4 md:justify-center items-center'>
                <div className='flex flex-col items-center w-[200px] md:w-[250px] md:h-[250px] p-2 bg-white shadow-xl rounded-md'>
                    <Image src={bible} alt="bible icon"
                        width={40}
                        height={40}
                        className='w-40 h-40 md:w-40 md:h-40' />
                    <div className='flex flex-col items-center'>
                        <p className='italic'>Read the Bible</p>
                        <p className='text-center '>clean reading experience.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center w-[200px] md:w-[300px] md:h-[320px] p-2 bg-white shadow-xl rounded-md'>
                    <Image src={note} alt="note icon"
                        width={40}
                        height={40}
                        className='w-40 h-40 md:w-60 md:h-60' />
                    <div className='flex flex-col items-center'>
                        <p className='italic'>Take Notes</p>
                        <p className='text-center '>jot down reflections & sync across devices.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center w-[200px] md:w-[250px] md:h-[250px] p-2 bg-white shadow-xl rounded-md'>
                    <Image src={bot} alt="bot icon"
                        width={40}
                        height={40}
                        className='w-40 h-40 md:w-40 md:h-40' />
                    <div className='flex flex-col items-center'>
                        <p className='italic'>AI Chatbot</p>
                        <p className='text-center '>ask questions, get explanations, and guidance.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturesSection
