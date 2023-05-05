import {db} from "~/bibleDataApi/db";

export const getChapter = async (book: string, chapter: number) => {
    const {data} = await db.from("vdc-chapter").select().ilike('book', book).eq('chapter', chapter);
    return data?.[0]?.content
}

