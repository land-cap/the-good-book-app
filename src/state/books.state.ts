import { createEffect, createMemo, createSignal } from 'solid-js'
import { getBookList } from '~/bibleDataApi/bibleDataApi'
import { CONTENT_TYPE, TBook, TChapter } from '~/model'

export const [bookList, setBookList] = createSignal<TBook[]>([])

createEffect(() => {
	getBookList().then((data) => {
		setBookList(data)
	})
})

export const [currBookCode, setCurrBookCode] = createSignal(null as unknown as string)

export const [currChapter, setCurrChapter] = createSignal(null as unknown as number)

export const [chapterData, setChapterData] = createSignal<TChapter>([])

export const chapterTitle = createMemo(
	() => chapterData().find(({ type }) => type === CONTENT_TYPE.ChapterTitle)?.content as string
)
