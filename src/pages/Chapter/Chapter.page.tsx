import { useParams } from '@solidjs/router'
import { createEffect, createSignal, For } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { TChapter as ChapterType } from '~/model'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'
// @ts-ignore
import styles from './chapter.module.css'
import { bookCodeList } from '~/state/books.state'

const [bookCode, setBookCode] = createSignal<string | null>(null)
const [chapter, setChapter] = createSignal<number | null>(null)
const [chapterData, setChapterData] = createSignal<ChapterType>([])

createEffect(() => {
	if (bookCode() && chapter()) {
		const bookId = bookCodeList().find((book) => book.code === bookCode())?.id
		if (bookId) {
			getChapter(bookId, chapter() as number).then(setChapterData)
		}
	}
})

export const Chapter = () => {
	const { bookCode, chapter } = useParams()

	createEffect(() => {
		setBookCode(bookCode)
		setChapter(parseInt(chapter))
	})

	createEffect(() => console.log(chapterData()))

	return (
		<main class={styles.container}>
			<For each={chapterData()}>
				{(contentItem) => {
					const Component = contentTypeToComponent[contentItem.type]
					// @ts-ignore
					return <Component contentItem={contentItem} />
				}}
			</For>
		</main>
	)
}
