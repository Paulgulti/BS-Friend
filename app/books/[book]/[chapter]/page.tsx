import { fetchVerses } from '@/actions/fetchVersesOfChapter'
import { cormorantGaramondRegular } from '@/app/layout'
import React from 'react'

const page = async ({
  params
}: {
  params: Promise<{ chapter: number, book: string }>
}) => {
  const { chapter, book } = await params
  const stringfiedChapter = parseInt(chapter.toString())
  const verses = await fetchVerses(book, stringfiedChapter)
  

  return (
    <div className="max-w-[500px] px-1 md:px-2 mt-2 md:mt-3">
      <h1 className="text-lg">Chapter: {chapter}</h1>
      <div>
        {verses.map(vers =>
          <div 
            key={`/${book}/${vers.chapterId}/${vers.number}`}
            className={`${cormorantGaramondRegular.className} md:text-xl`}>
            <p><span className="font-semibold">{vers.number}:</span> {vers.text}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page