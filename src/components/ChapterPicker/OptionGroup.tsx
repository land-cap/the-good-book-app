import * as combobox from '@zag-js/combobox'
import { Collapsible } from '@kobalte/core'
import { createEffect, createMemo, createSignal, For } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { Capped, comboboxStyles } from '~/cap-ui'
import { selectedBookLabel, setSelectedBookLabel } from '~/components/ChapterPicker/ChapterPicker'
// @ts-ignore
import styles from './OptionGroup.module.css'
import { Icon } from '~/components/composable/Icon'
import { Option, OptionIcon } from '~/cap-ui/Combobox/combobox.presentational'
import { ChapterOption } from '~/components/ChapterPicker/ChapterOption'

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

const { option, optionIcon } = comboboxStyles

export const OptionGroup = (props: {
	optionGroup: TOptionGroup
	comboboxApi: ReturnType<typeof combobox.connect>
	groupIndex: number
}) => {
	const [optionEl, setOptionEl] = createSignal(null as unknown as HTMLElement)

	const [collapsibleContentEl, setCollapsibleContentEl] = createSignal(
		null as unknown as HTMLElement
	)

	createEffect(() => {
		if (collapsibleContentEl() && optionEl()) {
			const scrollIntoView = (element: Element) => {
				element.scrollIntoView({
					// @ts-ignore
					behavior: 'instant',
					block: 'nearest',
					inline: 'nearest',
				})
				return null
			}
			const observer = new ResizeObserver((entries) => {
				entries.forEach(() => {
					scrollIntoView(optionEl())
				})
			})
			observer.observe(collapsibleContentEl())
		}
	})

	const handleBookOptionClick = () => {
		setSelectedBookLabel(
			selectedBookLabel() === props.optionGroup.label ? null : props.optionGroup.label
		)
	}

	const showChapters = createMemo(() => selectedBookLabel() === props.optionGroup.label)

	return (
		<Collapsible.Root open={showChapters()} ref={setOptionEl}>
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

					<OptionIcon class={twMerge(optionIcon, 'text-gray-400', showChapters() && 'text-black')}>
						<Icon
							name={'expand_more'}
							class={twMerge(styles.collapsible__triggerIcon, showChapters() && 'text-black')}
						/>
					</OptionIcon>
				</Option>
			</Collapsible.Trigger>
			<Collapsible.Content ref={setCollapsibleContentEl} class={styles.collapsible__content}>
				<div class="grid grid-cols-5 gap-px bg-primary-100 border-y border-primary-100">
					<For each={props.optionGroup.options}>
						{({ value, label }, index) => (
							<ChapterOption
								chapter={value}
								label={label}
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
	)
}