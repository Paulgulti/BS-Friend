import Image from 'next/image'
import React from 'react'

const loading = () => {
  return (
    <div className='flex h-screen items-center justify-center animate-spin'>
      <Image
        src="/loading.svg"
        alt="loading"
        width={80}
        height={80}
      />
    </div>
  )
}

export default loading
