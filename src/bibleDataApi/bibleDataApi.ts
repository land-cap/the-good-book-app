import { db } from '~/bibleDataApi/db'
import { TChapter } from '~/model/TChapter'

export const getChapter = async (bookId: number, chapter: number) => {
	const { data } = await db
		.from('vdc-chapter')
		.select()
		.eq('book_id', bookId)
		.eq('chapter', chapter)
	return data?.[0]?.content as TChapter
}
