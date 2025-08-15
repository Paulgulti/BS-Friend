
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import kjv from '../public/KJV.json'
import { pipeline } from '@huggingface/transformers'

export interface Bible {
    translation: string;
    books: {
        name: string;
        chapters: {
            chapter: number;
            verses: {
                verse: number;
                text: string;
            }[]
        }[]
    }[]
}

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)

const BATCH_SIZE = 32 // adjust for your memory/speed balance

async function uploadBible() {
    const bible = kjv as Bible

    console.log('📦 Loading embedding model...')
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
    console.log('✅ Model loaded.')

    for (const book of bible.books) {
        for (const chapter of book.chapters) {
            const verses = chapter.verses.map(v => ({
                book: book.name,
                chapter: chapter.chapter,
                verse: v.verse,
                text: v.text
            }))

            for (let i = 0; i < verses.length; i += BATCH_SIZE) {
                const batch = verses.slice(i, i + BATCH_SIZE)
                const texts = batch.map(v => v.text)

                // Get embeddings for this batch
                const outputs = await extractor(texts, { pooling: 'mean', normalize: true })
                const dims = outputs.dims[1]
                const embeddings: number[][] = Array.from(outputs.data as Float32Array)
                    .reduce((acc: number[][], val: number, idx: number) => {
                        const row = Math.floor(idx / dims)
                        if (!acc[row]) acc[row] = []
                        acc[row].push(val)
                        return acc
                    }, [])

                // Prepare batch insert payload
                const insertPayload = batch.map((v, j) => ({
                    book: v.book,
                    chapter: v.chapter,
                    verse: v.verse,
                    text: v.text,
                    embedding: embeddings[j]
                }))

                // Insert all verses in one Supabase call
                const { error } = await supabase.from('verses').insert(insertPayload)

                if (error) {
                    console.error(`❌ Error inserting batch starting at ${batch[0].book} ${batch[0].chapter}:${batch[0].verse}`, error)
                } else {
                    console.log(`✅ Inserted ${batch.length} verses from ${batch[0].book} ${batch[0].chapter}:${batch[0].verse}`)
                }
            }
        }
    }

    console.log('🎉 Finished uploading Bible.')
}

uploadBible()

