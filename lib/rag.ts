import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@huggingface/transformers";

export type Verse = {
  book: number;
  chapter: number;
  text: string;
  verse: number;
};

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// HuggingFace embedding model cache
let extractor: any;

async function loadModel() {
  if (!extractor) {
    console.log("Loading embedding model...");
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return extractor;
}

export async function queryRAG(query: string, topK = 5): Promise<Verse[]> {
  const model = await loadModel();

  // Create embedding for the query
  const output = await model(query, { pooling: "mean", normalize: true });
  const queryEmbedding = Array.from(output.data as Float32Array);

  // Search in Supabase
  const { data, error } = await supabase.rpc("match_verses", {
    query_embedding: queryEmbedding,
    match_count: topK,
  });

  if (error) throw error;

  return data as Verse[]

  // const verses = data as Verse[];

  // // Format as context string
  // return verses
  //   .map((v) => `${v.book} ${v.chapter}:${v.verse} — ${v.text}`)
  //   .join("\n");
}
