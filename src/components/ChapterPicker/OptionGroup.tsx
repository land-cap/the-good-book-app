import * as combobox from '@zag-js/combobox'
import { Collapsible } from '@kobalte/core'
import { createMemo, createSignal, For, JSX } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { Capped, comboboxStyles } from '~/cap-ui'
import { selectedBookLabel, setSelectedBookLabel } from '~/components/ChapterPicker/ChapterPicker'
// @ts-ignore
import styles from './OptionGroup.module.css'
import { Icon } from '~/components/composable/Icon'
import { Option, OptionIcon } from '~/cap-ui/Combobox/combobox.presentational'

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

const { option, option_focused, optionIcon } = comboboxStyles

export const OptionGroup = (props: {
	optionGroup: TOptionGroup
	comboboxApi: ReturnType<typeof combobox.connect>
	groupIndex: number
	onMouseEnter: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
	onMouseLeave: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
}) => {
	const [optionEl, setOptionEl] = createSignal(null as unknown as HTMLElement)

	const handleBookOptionClick = () => {
		setSelectedBookLabel(
			selectedBookLabel() === props.optionGroup.label ? null : props.optionGroup.label
		)
		optionEl().scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'nearest',
		})
	}

	const showChapters = createMemo(() => selectedBookLabel() === props.optionGroup.label)

	return (
		<div ref={setOptionEl}>
			<Collapsible.Root open={showChapters()}>
				<Collapsible.Trigger
					as="div"
					class={twMerge('w-full text-left', styles.collapsible__trigger)}
				>
					<Option
						onClick={handleBookOptionClick}
						class={twMerge(
							option,
							'flex justify-between',
							showChapters() && 'font-bold bg-primary-100'
						)}
					>
						<Capped component="div" fontSize={'sm'}>
							{props.optionGroup.label}
						</Capped>

						<OptionIcon
							class={twMerge(optionIcon, 'text-gray-400', showChapters() && 'text-black')}
						>
							<Icon
								name={'expand_more'}
								class={twMerge(styles.collapsible__triggerIcon, showChapters() && 'text-black')}
							/>
						</OptionIcon>
					</Option>
				</Collapsible.Trigger>
				<Collapsible.Content class={styles.collapsible__content}>
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
				</Collapsible.Content>
			</Collapsible.Root>
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
			{props.chapter}
		</li>
	)
}
