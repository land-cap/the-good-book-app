import { For } from 'solid-js'
import { Capped } from '~/cap-ui'
import {
	CONTENT_TYPE,
	TBody,
	TChapterTitle,
	TQuote,
	TSectionTitle,
	TVerse,
	VERSE_CONTENT_TYPE,
} from '~/model'
import { useIsBreakpoint } from '~/hooks/useIsBreakpoint'

export const ChapterTitle = ({ contentItem: { content } }: { contentItem: TChapterTitle }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped component="h1" fontSize={isDesktop() ? '4xl' : '3xl'} class="font-bold my-12 sm:my-16">
			{content}
		</Capped>
	)
}

export const SectionTitle = ({ contentItem: { content } }: { contentItem: TSectionTitle }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped component={'h2'} fontSize={isDesktop() ? '2xl' : 'xl'} class="font-bold my-8 sm:my-12">
			{content}
		</Capped>
	)
}
export const VerseNumber = ({ number }: { number: number }) => (
	<sup class={'font-bold text-gray-500 font-sans'}>{number}</sup>
)

export const JesusWords = ({ content }: { content: string }) => (
	<span class="text-red-600 dark:text-red-400">{content}</span>
)

export const Body = ({ contentItem: { content } }: { contentItem: TBody }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped
			component={'p'}
			fontSize={isDesktop() ? 'lg' : 'base'}
			lineGap={isDesktop() ? 32 : 24}
			// class="tracking-wide"
		>
			<For each={content}>{(verse) => <Verse verse={verse} />}</For>
		</Capped>
	)
}

export const Verse = ({ verse: { verseNumber, content } }: { verse: TVerse }) => (
	<>
		{' '}
		<VerseNumber number={verseNumber} />{' '}
		{
			<For each={content}>
				{({ type, content }) =>
					type === VERSE_CONTENT_TYPE.Text ? content : <JesusWords content={content} />
				}
			</For>
		}
	</>
)

export const Quote = ({ contentItem: { verseNumber, content } }: { contentItem: TQuote }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped
			component={'q'}
			fontSize={isDesktop() ? 'lg' : 'base'}
			lineGap={isDesktop() ? 32 : 24}
			// @ts-ignore
			mono
			class="block font-mono"
		>
			{verseNumber ? (
				<>
					<VerseNumber number={verseNumber} />{' '}
				</>
			) : null}
			{content}
		</Capped>
	)
}

export const contentTypeToComponent = {
	[CONTENT_TYPE.ChapterTitle]: ChapterTitle,
	[CONTENT_TYPE.SectionTitle]: SectionTitle,
	[CONTENT_TYPE.Body]: Body,
	[CONTENT_TYPE.Quote]: Quote,
}
