import { fetchFullNote } from '@/actions/fetchNotes'
import NotePage from '@/components/NotePage';
import Link from 'next/link';
import React from 'react'

const page = async ({ params }: { params: Promise<{ noteId: number }> }) => {
  const { noteId } = await params;
  const id = parseInt(noteId.toString())

  const fullNote = await fetchFullNote(id)
  return (
    <div className='container mt-4'>
      <div className='mb-3 pl-2'>
        <Link 
          href='/notes'
          className='border rounded-lg py-1 px-2 hover:bg-gray-200'>Back</Link>
      </div>
      <NotePage fullNote={fullNote!}/>
    </div>
  )
}

export default page