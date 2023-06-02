import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import {
	createEffect,
	createMemo,
	createSignal,
	createUniqueId,
	For,
	onMount,
	Show,
} from 'solid-js'
import { Icon } from '~/components/composable/Icon'
import {
	Container,
	Input,
	InputButton,
	OptionContainer,
} from '~/cap-ui/Combobox/combobox.presentational'
import { comboboxStyles } from '~/cap-ui/Combobox/combobox.styles'
import { Motion, Presence } from '@motionone/solid'
import { twMerge } from 'tailwind-merge'
import { OptionGroup, TOptionGroup } from '~/components/ChapterPicker/OptionGroup'
import { range } from 'ramda'
import {
	bookList,
	currBookCode,
	currChapter,
	setCurrBookCode,
	setCurrChapter,
} from '~/state/books.state'
import { useNavigate } from '@solidjs/router'
import { Capped, withCustomStyles } from '~/cap-ui'

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ChapterPickerProps = {
	context?: Partial<Parameters<typeof combobox.machine>[0]>
	placeholder?: string
	setApiRef?: (ref: ComboboxApi) => void
	stylesOverride?: Partial<typeof comboboxStyles>
}

const { input, inputButton } = comboboxStyles

export const [selectedBookLabel, setSelectedBookLabel] = createSignal<string | null>(null)

createEffect(() => {
	const currBookName = bookList()?.find(({ code }) => code === currBookCode())?.name
	if (currBookName) {
		setSelectedBookLabel(currBookName)
	}
})

const optionGroupList = createMemo<TOptionGroup[]>(() =>
	bookList().map(({ name, chapter_count, code }) => {
		const options = range(1, chapter_count + 1).map((chapter) => ({
			value: chapter,
			label: `${name} ${chapter}`,
			disabled: false,
		}))
		return {
			label: name,
			bookCode: code,
			options,
		}
	})
)

const ChapterPicker = (props: ChapterPickerProps) => {
	const [options, setOptions] = createSignal(optionGroupList())

	const [state, send] = useMachine(
		combobox.machine({
			id: createUniqueId(),
			onOpen: () => {
				setOptions(optionGroupList())
			},
			onInputChange: ({ value }) => {
				// setSelectedBookLabel(null)
				const filtered =
					optionGroupList().filter((item) =>
						item.label.toLowerCase().includes(value.toLowerCase())
					) || []
				setOptions(filtered.length > 0 ? filtered : optionGroupList())
			},
			// eslint-disable-next-line solid/reactivity
			...props.context,
		})
	)

	const api = createMemo(() => combobox.connect(state, send, normalizeProps))

	const navigate = useNavigate()

	createEffect(() => {
		const newValue = api().selectedValue
		if (newValue) {
			const { bookCode, chapter } = JSON.parse(newValue) as { bookCode: string; chapter: number }
			navigate(`/${bookCode}/${chapter}`)
			setCurrBookCode(bookCode)
			setCurrChapter(chapter)
		}
	})

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
	})

	createEffect(() => setOptions(optionGroupList()))

	const [isInitialValueSet, setIsInitialValueSet] = createSignal(false)

	createEffect(() => {
		if (currBookCode() && currChapter() && !isInitialValueSet()) {
			const bookName = bookList().find((book) => book.code === currBookCode())?.name
			if (bookName && !api().inputValue) {
				api().setValue({
					value: JSON.stringify({ bookCode: currBookCode(), chapter: currChapter() }),
					label: `${bookName} ${currChapter()}`,
				})
				setIsInitialValueSet(true)
			}
		}
	})

	const positionerProps = createMemo(() => {
		const positionerProps = { ...api().positionerProps }
		// @ts-ignore
		delete positionerProps.style['min-width']
		return positionerProps
	})

	return (
		<Container class={props.stylesOverride?.container}>
			<div {...api().rootProps}>
				<div {...api().controlProps}>
					<button
						{...api().triggerProps}
						class={twMerge(
							input,
							props.stylesOverride?.input,
							'flex items-center justify-between p-4 sm:hidden'
						)}
					>
						<Capped component={'span'} fontSize={'base'}>
							{api().inputValue}
						</Capped>
						<div
							class={twMerge(
								inputButton,
								props.stylesOverride?.inputButton,
								'static p-0 -my-2 sm:hidden'
							)}
						>
							<Icon name={'unfold_more'} />
						</div>
					</button>

					<Input
						{...api().inputProps}
						placeholder={props.placeholder}
						class={twMerge(props.stylesOverride?.input, 'hidden sm:block')}
					/>
					<InputButton
						{...api().triggerProps}
						class={twMerge(props.stylesOverride?.inputButton, 'hidden sm:flex')}
					>
						<Icon name={'unfold_more'} />
					</InputButton>
				</div>
			</div>
			<Presence exitBeforeEnter>
				<Show when={api().isOpen}>
					<Motion.div
						initial={{ opacity: 0, scale: 0.75 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, easing: 'ease-out' } }}
						exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.1, easing: 'ease-in' } }}
					>
						<OptionContainer
							{...positionerProps}
							class={twMerge(props.stylesOverride?.optionContainer, 'max-h-[75vh] sm:max-h-[50vh]')}
						>
							<ul {...api().contentProps}>
								<For each={options()}>
									{(optionGroup, groupIndex) => (
										<OptionGroup
											optionGroup={optionGroup}
											comboboxApi={api()}
											groupIndex={groupIndex()}
										/>
									)}
								</For>
							</ul>
						</OptionContainer>
					</Motion.div>
				</Show>
			</Presence>
		</Container>
	)
}

const StyledChapterPicker = createMemo(() =>
	withCustomStyles(ChapterPicker, {
		input: 'rounded-none ring-2 shadow-none ring-gray-200 dark:ring-gray-700',
		optionContainer: 'rounded-none',
		inputButton: 'hover:text-primary-600 dark:hover:text-primary-500',
	})
)

export { StyledChapterPicker as ChapterPicker }
