import { useParams } from '@solidjs/router'
import { createEffect, For, on } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'
// @ts-ignore
import styles from './Chapter.module.css'
import {
	bookCode,
	bookList,
	chapter,
	chapterData,
	setBookCode,
	setChapter,
	setChapterData,
} from '~/state/books.state'

createEffect(async () => {
	if (bookCode() && chapter()) {
		const bookId = bookList().find(({ code }) => code === bookCode())?.id
		if (bookId) {
			const data = await getChapter(bookId, chapter())
			setChapterData(data)
		}
	}
})

export const Chapter = () => {
	const { bookCode, chapter } = useParams()

	createEffect(
		on(
			() => bookCode,
			() => {
				// @ts-ignore
				setBookCode(bookCode)
				setChapter(parseInt(chapter))
			}
		)
	)

	return (
		<main class={styles.container}>
			<For each={chapterData()}>
				{(contentItem) => {
					const Component = contentTypeToComponent[contentItem.type]
					// @ts-ignore
					return Component ? <Component contentItem={contentItem} /> : null
				}}
			</For>
		</main>
	)
}
