import { useIsBreakpoint } from '~/hooks/useIsBreakpoint'
import { Capped } from '~/cap-ui/meta/Capped'
import { useParams } from '@solidjs/router'
import { createEffect, createSignal, For } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'
import { TChapter as ChapterType } from '~/model'
import { contentTypeToComponent } from '~/pages/Chapter/chapterComponents'

const [bookId, setBookId] = createSignal<number | null>(null)
const [chapter, setChapter] = createSignal<number | null>(null)
const [chapterData, setChapterData] = createSignal<ChapterType>([])

createEffect(() => {
	if (bookId() && chapter())
		getChapter(bookId() as number, chapter() as number).then(setChapterData)
})

export const Chapter = () => {
	const isDesktop = useIsBreakpoint('sm')

	const { bookId, chapter } = useParams()

	createEffect(() => {
		setBookId(parseInt(bookId))
		setChapter(parseInt(chapter))
	})

	createEffect(() => console.log(chapterData()))

	return (
		<div class={'flex flex-col gap-14 mt-14'}>
			<Capped
				component={'p'}
				fontSize={isDesktop() ? 'lg' : 'base'}
				lineGap={isDesktop() ? 32 : 24}
				class="dark:text-gray-400 font-serif"
			>
				<For each={chapterData()}>
					{(contentItem) => {
						const Component = contentTypeToComponent[contentItem.type]
						// @ts-ignore
						return <Component contentItem={contentItem} />
					}}
				</For>
			</Capped>
		</div>
	)
}
