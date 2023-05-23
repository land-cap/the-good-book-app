import { db } from '~/bibleDataApi/db'
import { TChapter } from '~/model/chapter'
import { TBook, TBookCode } from '~/model'

export const getBookList = async () => {
	const { data } = await db.from('vdc_book').select()
	const sortedData = data?.sort((a, b) => a.order - b.order)
	return sortedData as TBook[]
}

export const getChapter = async (bookId: number, chapter: number) => {
	const { data } = await db
		.from('vdc_chapter')
		.select()
		.eq('book_id', bookId)
		.eq('chapter', chapter)
	return data?.[0]?.content as TChapter
}

export const getBookCodeList = async () => {
	const { data } = await db.from('book_code').select()
	const sortedData = data?.sort((a, b) => a.book_id - b.book_id)
	return sortedData as TBookCode[]
}
