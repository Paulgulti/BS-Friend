import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="relative bg-sky-300 text-white text-center pt-10 mt-30">
            {/* Semi-arc shape */}
            <div className="absolute -top-20 left-0 w-full overflow-hidden leading-none">
                <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="w-full h-20"
                >
                    <path
                        d="M0,150 C150,0 350,0 500,150 L500,0 L0,0 Z"
                        className="fill-sky-300"
                    ></path>
                </svg>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <h2 className="md:text-xl font-semibold text-gray-800">BS-Friend</h2>
                <div className='flex gap-3'>
                    <Link 
                        href="https://github.com/Paulgulti"
                        className='hover:scale-[1.05]'
                        target='_blank'>
                        <Image
                            src="/github-logo.svg"
                            width={20}
                            height={20}
                            alt='github logo'
                        />
                    </Link>
                    <Link 
                        href="http://linkedin.com/in/paulos-gulti-330245238"
                        className='hover:scale-[1.05]'
                        target='_blank'>
                        <Image
                            src="/linkedin-logo.svg"
                            width={20}
                            height={20}
                            alt='linkedin logo'
                        />
                    </Link>
                    <Link 
                        href="https://x.com/paulma00s"
                        className='hover:scale-[1.05]'
                        target='_blank'>
                        <Image
                            src="/x-logo.svg"
                            width={20}
                            height={20}
                            alt='x logo'
                        />
                    </Link>
                </div>
                <p className="mt-2 text-sm text-gray-600 ">© 2025 AdAstra ET. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer