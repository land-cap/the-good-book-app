import { useParams } from '@solidjs/router'
import { createEffect, createMemo, createSignal, For } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { CONTENT_TYPE, TChapter } from '~/model'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'
// @ts-ignore
import styles from './chapter.module.css'
import { bookCodeList } from '~/state/books.state'

export const [bookCode, setBookCode] = createSignal<string | null>(null)

const [chapter, setChapter] = createSignal<number | null>(null)

const [chapterData, setChapterData] = createSignal<TChapter>([])

export const chapterTitle = createMemo(
	() => chapterData().find(({ type }) => type === CONTENT_TYPE.ChapterTitle)?.content as string
)

createEffect(async () => {
	if (bookCode() && chapter()) {
		const bookId = bookCodeList().find((book) => book.code === bookCode())?.id
		if (bookId) {
			const data = await getChapter(bookId, chapter() as number)
			setChapterData(data)
		}
	}
})

export const Chapter = () => {
	const { bookCode, chapter } = useParams()

	createEffect(() => {
		setBookCode(bookCode)
		setChapter(parseInt(chapter))
	})

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
