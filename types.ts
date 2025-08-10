export type Book = {
    id: number;
    name: string;
    slug: string;
}

export type Chapter = {
    number: number;
    verses: Verse[];
}

export type Verse = {
    number: number;
    id: number;
    text: string;
    chapterId: number;
}