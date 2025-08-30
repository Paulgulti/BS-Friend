import { Note } from '@/types'
import Link from 'next/link'
import React from 'react'

const NoteCard = ({ notes }: { notes: Note[] }) => {


    return (
        <>
            {notes.map(note => (
                <div
                    key={note.id} 
                    className='border border-gray-500  rounded-xl w-[250px] pl-1'>
                    <h3 className='prose line-clamp-1 text-gray-700'>{note.title}</h3>
                    <div
                        className='prose line-clamp-2'
                        dangerouslySetInnerHTML={{ __html: note.content! }}>
                    </div>
                    <Link
                        href={`/notes/${note.id}`}
                        className='text-gray-700 hover:cursor-pointer hover:text-black'>
                            read more
                    </Link>
                </div>
            ))}
        </>
    )
}

export default NoteCard
