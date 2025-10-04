import Image from 'next/image'
import React from 'react'

const ValueSection = () => {
  return (
    <div className='container mx-auto bg-sky-200 grid grid-cols-1 md:grid-cols-2 p-5'>
      <div className='flex items-center justify-center'>
        <Image
          src="/studying.svg"
          alt=""
          width={40}
          height={40}
          className='w-full h-40 md:h-120'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <h2 className='font-semibold md:text-xl'>Built for Deeper Study and Reflection</h2>
        <p className='text-gray-700 text-sm mb-2 md:mb-3'>Unlike generic Bible apps, we let you converse with the Bible interactively.</p>
        <ol className='px-1 flex flex-col gap-1.5'>
          <li className='text-gray-700 text-sm md:text-md'><span className=' rounded-full px-2 bg-sky-600 text-white mr-1.5'>1</span><span className='text-black font-semibold'>Accessible</span> to everyone and anywhere.</li>
          <li className='text-gray-700 text-sm md:text-md'><span className=' rounded-full px-2 bg-sky-600 text-white mr-1.5'>2</span><span className='text-black font-semibold'>Personalized</span> AI BS-buddy.</li>
          <li className='text-gray-700 text-sm md:text-md'><span className=' rounded-full px-2 bg-sky-600 text-white mr-1.5'>3</span><span className='text-black font-semibold'>Distraction-free</span> reading.</li>
          <li className='text-gray-700 text-sm md:text-md'><span className=' rounded-full px-2 bg-sky-600 text-white mr-1.5'>3</span><span className='text-black font-semibold'>Clean</span> note taking.</li>
        </ol>
      </div>
    </div>
  )
}

export default ValueSection