import { useIsBreakpoint } from '~/hooks/useIsBreakpoint'
import { Capped } from '~/cap-ui/meta/Capped'
import { useParams } from '@solidjs/router'
import { createEffect, createMemo, createSignal, For } from 'solid-js'
import { getChapter } from '~/bibleDataApi/bibleDataApi'

const [book, setBook] = createSignal<string | null>(null)
const [chapter, setChapter] = createSignal<number | null>(null)
const [chapterData, setChapterData] = createSignal([])
// @ts-ignore
const chapterTitle = createMemo(() => chapterData()[0]?.content)

createEffect(() => console.log(chapterTitle()))

createEffect(() => {
	if (book() && chapter()) getChapter(book() as string, chapter() as number).then(setChapterData)
})

type Verse = { verseNumber: number; content: string }

const VerseNumber = ({ number }: { number: number }) => (
	<sup class={'font-bold text-gray-500 font-sans not-italic'}>{number}</sup>
)

const ChapterTitle = ({ children }: { children: any }) => (
	<Capped component="h1" class="font-bold tracking-tight font-serif" fontSize={'4xl'}>
		{children}
	</Capped>
)

const Verse = ({ verse: { verseNumber, content } }: { verse: Verse }) => (
	<>
		{' '}
		<VerseNumber number={verseNumber} /> {content}
	</>
)

export const Chapter = () => {
	const isDesktop = useIsBreakpoint('sm')

	const { book, chapter } = useParams()

	createEffect(() => {
		setBook(book)
		setChapter(parseInt(chapter))
	})

	createEffect(() => console.log(chapterData()))

	return (
		<div class={'flex flex-col gap-16 mt-16'}>
			{chapterTitle() ? <ChapterTitle>{chapterTitle()}</ChapterTitle> : null}
			<Capped
				component={'p'}
				fontSize={isDesktop() ? 'lg' : 'base'}
				lineGap={isDesktop() ? 32 : 24}
				class="dark:text-gray-400 font-serif"
			>
				<For each={chapterData()}>
					{({ type, content }) => {
						if (type === 'verse') {
							return <For each={content as Verse[]}>{(verse) => <Verse verse={verse} />}</For>
						} else if (type === 'quote') {
							return (
								<span class="italic">
									<br />
									<For each={content as Verse[]}>{(verse) => <Verse verse={verse} />}</For>
								</span>
							)
						}
					}}
				</For>
			</Capped>
		</div>
	)
}
