import { useParams } from '@solidjs/router'
import { createEffect, createSignal, For } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { TChapter as ChapterType } from '~/model'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'
import styles from './chapter.module.css'

const [bookId, setBookId] = createSignal<number | null>(null)
const [chapter, setChapter] = createSignal<number | null>(null)
const [chapterData, setChapterData] = createSignal<ChapterType>([])

createEffect(() => {
	if (bookId() && chapter())
		getChapter(bookId() as number, chapter() as number).then(setChapterData)
})

export const Chapter = () => {
	const { bookId, chapter } = useParams()

	createEffect(() => {
		setBookId(parseInt(bookId))
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
