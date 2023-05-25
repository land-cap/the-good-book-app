import { createEffect, createSignal } from 'solid-js'
import { getBookList } from '~/bibleDataApi/bibleDataApi'
import { TBook } from '~/model'

export const [bookList, setBookList] = createSignal<TBook[]>([])

createEffect(() => {
	getBookList().then((data) => {
		setBookList(data)
	})
})
