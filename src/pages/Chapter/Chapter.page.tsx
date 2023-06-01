import { useParams } from '@solidjs/router'
import { createEffect, createMemo, createSignal, For, on } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { CONTENT_TYPE, TChapter } from '~/model'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'
// @ts-ignore
import styles from './Chapter.module.css'
import { bookList } from '~/state/books.state'

export const [bookCode, setBookCode] = createSignal(null as unknown as string)

const [chapter, setChapter] = createSignal(null as unknown as number)

const [chapterData, setChapterData] = createSignal<TChapter>([])

export const chapterTitle = createMemo(
	() => chapterData().find(({ type }) => type === CONTENT_TYPE.ChapterTitle)?.content as string
)

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
