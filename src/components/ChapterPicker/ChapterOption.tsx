import * as combobox from '@zag-js/combobox'
import { createMemo, For, JSX } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { comboboxStyles } from '~/cap-ui'

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

const { option_focused } = comboboxStyles

export const ChapterOptions = (props: {
	optionGroup: TOptionGroup
	comboboxApi: ReturnType<typeof combobox.connect>
	groupIndex: number
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
				{({ value }, index) => (
					<ChapterOption
						chapter={value}
						bookCode={props.optionGroup.bookCode}
						bookName={props.optionGroup.label}
						comboboxApi={props.comboboxApi}
						index={props.groupIndex + index()}
					/>
				)}
			</For>
		</div>
	)
}

export const ChapterOption = (props: {
	chapter: number
	bookCode: string
	bookName: string
	comboboxApi: ReturnType<typeof combobox.connect>
	index: number
}) => {
	const optionIdentity = createMemo(() => ({
		label: `${props.chapter}`,
		value: `${props.bookCode} ${props.chapter}`,
		index: props.index,
		disabled: false,
	}))

	const optionState = createMemo(() => props.comboboxApi.getOptionState(optionIdentity()))

	const optionProps = props.comboboxApi.getOptionProps(optionIdentity())

	return (
		<li
			{...optionProps}
			class={twMerge(
				'cursor-pointer grid aspect-square align-middle place-content-center bg-white text-black',
				optionState()?.focused && option_focused
			)}
		>
			<a href={`/${props.bookCode}/${props.chapter}`}>{props.chapter}</a>
		</li>
	)
}
