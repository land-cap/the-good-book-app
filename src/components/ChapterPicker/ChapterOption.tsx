import { range } from 'ramda'
import { createMemo, For, JSX } from 'solid-js'
import { useNavigate } from '@solidjs/router'

export const ChapterOptions = (props: {
	chapterCount: number
	bookCode: string
	onMouseEnter: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
	onMouseLeave: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
}) => {
	const chapterList = createMemo(() => range(1, props.chapterCount + 1).map((chapter) => chapter))

	return (
		<div
			class="grid grid-cols-5 gap-px bg-primary-100 border-y border-primary-100"
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			<For each={chapterList()}>
				{(chapter) => <ChapterOption chapter={chapter} bookCode={props.bookCode} />}
			</For>
		</div>
	)
}

export const ChapterOption = (props: { chapter: number; bookCode: string }) => {
	const navigate = useNavigate()

	return (
		<a
			href={`/${props.bookCode}/${props.chapter}`}
			class="grid aspect-square align-middle place-content-center bg-white hover:bg-primary-500 text-black hover:text-white"
		>
			{props.chapter}
		</a>
	)
}
