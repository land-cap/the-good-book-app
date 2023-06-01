import { For, JSX } from 'solid-js'
import { useNavigate } from '@solidjs/router'

export type TChapterOption = {
	value: number
	label: string
	disabled: boolean
}
export type TOptionGroup = {
	label: string
	bookCode: string
	options: TChapterOption[]
}

export const ChapterOptions = (props: {
	optionGroup: TOptionGroup
	onMouseEnter: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
	onMouseLeave: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
}) => {
	return (
		<div
			class="grid grid-cols-5 gap-px bg-primary-100 border-y border-primary-100"
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			<For each={props.optionGroup.options}>
				{({ value }) => <ChapterOption chapter={value} bookCode={props.optionGroup.bookCode} />}
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
