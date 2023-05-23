import { createEffect, createSignal } from 'solid-js'
import { TBookCode } from '~/model'
import { getBookCodeList } from '~/bibleDataApi/bibleDataApi'

export const [bookCodeList, setBookCodeList] = createSignal<TBookCode[]>([])

createEffect(() => {
	getBookCodeList().then((data) => {
		setBookCodeList(data)
	})
})
