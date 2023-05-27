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
import { useIsBreakpoint } from '~/hooks'

export const ChapterTitle = (props: { contentItem: TChapterTitle }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped component="h1" fontSize={isDesktop() ? '4xl' : '3xl'} class="font-bold my-12 sm:my-16">
			{props.contentItem.content}
		</Capped>
	)
}

export const SectionTitle = (props: { contentItem: TSectionTitle }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped component={'h2'} fontSize={'xl'} class="font-bold my-8 md:my-10">
			{props.contentItem.content}
		</Capped>
	)
}
export const VerseNumber = (props: { number: number }) => (
	<sup class={'font-bold text-gray-500 font-sans'}>{props.number}</sup>
)

export const JesusWords = (props: { content: string }) => (
	<span class="text-red-600 dark:text-red-400">{props.content}</span>
)

export const Body = (props: { contentItem: TBody }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped
			component={'p'}
			fontSize={isDesktop() ? 'lg' : 'base'}
			lineGap={isDesktop() ? 32 : 24}
			class="tracking-wide"
		>
			<For each={props.contentItem.content}>{(verse) => <Verse verse={verse} />}</For>
		</Capped>
	)
}

export const Verse = (props: { verse: TVerse }) => (
	<>
		{' '}
		<VerseNumber number={props.verse.verseNumber} />{' '}
		{
			<For each={props.verse.content}>
				{({ type, content }) =>
					type === VERSE_CONTENT_TYPE.Text ? content : <JesusWords content={content} />
				}
			</For>
		}
	</>
)

export const Quote = (props: { contentItem: TQuote }) => {
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
			{props.contentItem.verseNumber ? (
				<>
					<VerseNumber number={props.contentItem.verseNumber} />{' '}
				</>
			) : null}
			{props.contentItem.content}
		</Capped>
	)
}

export const contentTypeToComponent = {
	[CONTENT_TYPE.ChapterTitle]: ChapterTitle,
	[CONTENT_TYPE.SectionTitle]: SectionTitle,
	[CONTENT_TYPE.Body]: Body,
	[CONTENT_TYPE.Quote]: Quote,
}
