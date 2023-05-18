import { For } from 'solid-js'
import { Capped } from '~/cap-ui'
import {
	Body as BodyType,
	Quote as QuoteType,
	Verse as VerseType,
	VERSE_CONTENT_TYPE,
} from '~/model'
import { useIsBreakpoint } from '~/hooks/useIsBreakpoint'

export const ChapterTitle = ({ content }: { content: string }) => (
	<Capped component="h1" class="font-bold tracking-tighter font-serif" fontSize={'4xl'}>
		{content}
	</Capped>
)

export const SectionTitle = ({ content }: { content: string }) => (
	<Capped component={'h2'} fontSize={'2xl'} class="font-bold tracking-tight my-8">
		{content}
	</Capped>
)
export const VerseNumber = ({ number }: { number: number }) => (
	<sup class={'font-bold text-gray-500 font-sans not-italic'}>{number}</sup>
)

export const JesusWords = ({ content }: { content: string }) => (
	<span class="text-red-600">{content}</span>
)

export const Body = ({ body: { content } }: { body: BodyType }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped
			component={'span'}
			fontSize={isDesktop() ? 'lg' : 'base'}
			lineGap={isDesktop() ? 32 : 24}
		>
			<For each={content}>{(verse) => <Verse verse={verse} />}</For>
		</Capped>
	)
}

export const Verse = ({ verse: { verseNumber, content } }: { verse: VerseType }) => (
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

export const Quote = ({ quote: { verseNumber, content } }: { quote: QuoteType }) => {
	const isDesktop = useIsBreakpoint('sm')

	return (
		<Capped component={'p'} fontSize={isDesktop() ? 'lg' : 'base'} lineGap={isDesktop() ? 32 : 24}>
			{verseNumber ? <VerseNumber number={verseNumber} /> : null}
			{content}
		</Capped>
	)
}
