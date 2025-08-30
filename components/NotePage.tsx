import { Note } from '@/types'
import React from 'react'

const NotePage = ({ fullNote }: { fullNote: Note }) => {
    return (
        <div
            className='container w-[250px] md:w-[600px] mx-auto'>
            <div>
                <h3 className='prose text-gray-700 text-lg md:text-2xl'>Title: {fullNote?.title}</h3>
                <div
                    className='prose'
                    dangerouslySetInnerHTML={{ __html: fullNote?.content! }}>
                </div>
            </div>
        </div>
    )
}

export default NotePage 