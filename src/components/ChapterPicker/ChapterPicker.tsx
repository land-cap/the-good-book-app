import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import {
	createEffect,
	createMemo,
	createSignal,
	createUniqueId,
	For,
	JSX,
	on,
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
import { Dynamic } from 'solid-js/web'
import { OptionGroup, TOptionGroup } from '~/components/ChapterPicker/OptionGroup'
import { range } from 'ramda'
import { bookCode, bookList, chapter, setBookCode, setChapter } from '~/state/books.state'
import { useNavigate } from '@solidjs/router'

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ChapterPickerProps = {
	context?: Partial<Parameters<typeof combobox.machine>[0]>
	placeholder?: string
	setApiRef?: (ref: ComboboxApi) => void
	stylesOverride?: Partial<typeof comboboxStyles>
}

export const [selectedBookLabel, setSelectedBookLabel] = createSignal<string | null>(null)

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
			onOpen() {
				setOptions(optionGroupList())
			},

			onInputChange({ value }) {
				setSelectedBookLabel(null)
				const filtered =
					optionGroupList().filter((item) =>
						item.label.toLowerCase().includes(value.toLowerCase())
					) || []
				setOptions(filtered.length > 0 ? filtered : optionGroupList())
			},
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
			setBookCode(bookCode)
			setChapter(chapter)
		}
	})

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
	})

	createEffect(() => {
		on(
			() => optionGroupList(),
			() => setOptions(optionGroupList())
		)
	})

	createEffect(
		on(
			() => {
				bookCode()
				chapter()
				bookList()
			},
			() => {
				if (bookCode() && chapter() && api()) {
					const bookName = bookList().find((book) => book.code === bookCode())?.name
					if (bookName) {
						api().setValue({
							value: JSON.stringify({ bookCode: bookCode(), chapter: chapter() }),
							label: `${bookName} ${chapter()}`,
						})
					}
				}
			}
		)
	)

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
					<Input
						{...api().inputProps}
						placeholder={props.placeholder}
						class={twMerge(props.stylesOverride?.input)}
					/>
					<InputButton {...api().triggerProps} class={props.stylesOverride?.inputButton}>
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
							class={twMerge(props.stylesOverride?.optionContainer, 'max-h-[50vh]')}
						>
							<ul {...api().contentProps}>
								<For each={options()}>
									{(optionGroup, groupIndex) => {
										return (
											<OptionGroup
												optionGroup={optionGroup}
												comboboxApi={api()}
												groupIndex={groupIndex()}
											/>
										)
									}}
								</For>
							</ul>
						</OptionContainer>
					</Motion.div>
				</Show>
			</Presence>
		</Container>
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
