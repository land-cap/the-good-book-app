import * as combobox from '@zag-js/combobox'
import { createMemo } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { comboboxStyles } from '~/cap-ui'

const { option_focused } = comboboxStyles
export const ChapterOption = (props: {
	chapter: number
	label: string
	bookCode: string
	bookName: string
	comboboxApi: ReturnType<typeof combobox.connect>
	index: number
}) => {
	const optionIdentity = createMemo(() => ({
		label: props.label,
		value: JSON.stringify({ bookCode: props.bookCode, chapter: props.chapter }),
		index: props.index,
		disabled: false,
	}))

	const optionState = createMemo(() => props.comboboxApi.getOptionState(optionIdentity()))

	const optionProps = props.comboboxApi.getOptionProps(optionIdentity())

	return (
		<li
			{...optionProps}
			class={twMerge(
				'cursor-pointer grid aspect-square align-middle place-content-center bg-white text-black text-base sm:text-sm',
				optionState()?.focused && option_focused
			)}
		>
			{props.chapter}
		</li>
	)
}
