import { db } from '~/bibleDataApi/db'
import { TChapter } from '~/model/chapter.model'
import { TBook } from '~/model'

export const getBookList = async () => {
	const { data: bookNameList } = await db.from('vdc_book_name').select()
	const { data: bookList } = await db.from('book').select()
	const sortedBookList = bookList
		?.sort((a, b) => a.order - b.order)
		.map((book) => ({
			...book,
			name: bookNameList?.find((bookName) => bookName.order === book.order)?.name,
		}))
	return sortedBookList as TBook[]
}

export const getChapter = async (bookId: number, chapter: number) => {
	const { data } = await db
		.from('vdc_chapter')
		.select()
		.eq('book_id', bookId)
		.eq('chapter', chapter)
	return data?.[0]?.content as TChapter
}
