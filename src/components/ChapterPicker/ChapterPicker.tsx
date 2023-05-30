import { createEffect, createMemo, createSignal, JSX } from 'solid-js'
import { Icon } from '~/components/composable/Icon'
import { comboboxStyles } from '~/cap-ui/Combobox/combobox.styles'
import { Dynamic } from 'solid-js/web'
import { Combobox, createFilter } from '@kobalte/core'
import { bookList } from '~/state/books.state'
import { range } from 'ramda'
import { twMerge } from 'tailwind-merge'

type ChapterOption = {
	value: number
	label: string
	disabled: boolean
}
type Book = {
	label: string
	options: ChapterOption[]
}

export type ChapterPickerProps = {
	placeholder?: string
	stylesOverride?: Partial<typeof comboboxStyles>
}

const { option, optionContainer, option_focused } = comboboxStyles

const ChapterPicker = (props: ChapterPickerProps) => {
	const filter = createFilter({ sensitivity: 'base' })
	const [selectedBookName, setSelectedBookName] = createSignal<string | null>(null)
	const [isChaptersHovered, setIsChaptersHovered] = createSignal(false)

	const bookOptionList = createMemo<Book[]>(() =>
		bookList().map(({ name, chapter_count }) => {
			const options =
				name === selectedBookName()
					? range(1, chapter_count + 1).map((chapter) => ({
							value: chapter,
							label: chapter.toString(),
							disabled: false,
					  }))
					: []
			return {
				label: name,
				options,
			}
		})
	)

	createEffect(() => {
		console.log(bookOptionList())
		setOptions(bookOptionList())
	})

	const [options, setOptions] = createSignal<Array<ChapterOption | Book>>(bookOptionList())

	const onOpenChange = (isOpen: boolean, triggerMode?: Combobox.ComboboxTriggerMode) => {
		// Show all options on ArrowDown/ArrowUp and button click.
		if (isOpen && triggerMode === 'manual') {
			setOptions(bookOptionList())
		}
	}
	const onInputChange = (value: string) => {
		setOptions(
			bookOptionList()
				.map((optionOrGroup) => {
					// If it's a group, find matching options.
					const matchingOptions = optionOrGroup['options']?.filter((option) =>
						filter.contains(option.label, value)
					)
					// Return the group with only the matching options.
					if (matchingOptions && matchingOptions.length > 0) {
						return {
							...optionOrGroup,
							options: [...matchingOptions],
						}
					}
					// It's not a group, return if it's a matching option.
					if (filter.contains(optionOrGroup.label, value)) {
						return optionOrGroup
					}
					return null
				})
				.filter(Boolean) as Array<ChapterOption | Book>
		)
	}

	return (
		<Combobox.Root<ChapterOption, Book>
			options={options()}
			onInputChange={onInputChange}
			onOpenChange={onOpenChange}
			optionValue="value"
			optionTextValue="label"
			optionLabel="label"
			optionDisabled="disabled"
			optionGroupChildren="options"
			placeholder="Search a food…"
			itemComponent={(props) => (
				<Combobox.Item
					item={props.item}
					class="grid aspect-square align-middle place-content-center bg-white hover:bg-primary-500 text-black hover:text-white"
				>
					<Combobox.ItemLabel>{props.item.rawValue.label}</Combobox.ItemLabel>
				</Combobox.Item>
			)}
			sectionComponent={(props) => (
				<Combobox.Section
					onclick={() => {
						setSelectedBookName(
							selectedBookName() === props.section.rawValue.label
								? null
								: props.section.rawValue.label
						)
					}}
					class={twMerge(option, 'col-span-5')}
				>
					{props.section.rawValue.label}
				</Combobox.Section>
			)}
		>
			<Combobox.Control aria-label="Food">
				<Combobox.Input />
				<Combobox.Trigger>
					<Combobox.Icon>
						<Icon name={'sort'} />
					</Combobox.Icon>
				</Combobox.Trigger>
			</Combobox.Control>
			<Combobox.Portal>
				<Combobox.Content class={optionContainer}>
					<Combobox.Listbox class="grid grid-cols-5 gap-px bg-primary-100 border-y border-primary-100" />
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox.Root>
	)
}

export const withCustomStyles =
	<S, T>(Component: (props: T) => JSX.Element, stylesOverride: S) =>
	(props: T) =>
		<Dynamic component={Component} {...props} stylesOverride={stylesOverride} />

const StyledChapterPicker = withCustomStyles(ChapterPicker, {
	input: 'rounded-none ring-2 shadow-none ring-gray-200 dark:ring-gray-700',
	optionContainer: 'rounded-none',
	inputButton: 'hover:text-primary-600 dark:hover:text-primary-500',
})
export { StyledChapterPicker as ChapterPicker }
