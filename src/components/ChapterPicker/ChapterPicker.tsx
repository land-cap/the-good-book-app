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
	OptionLabel,
} from '~/cap-ui/Combobox/combobox.presentational'
import { comboboxStyles } from '~/cap-ui/Combobox/combobox.styles'
import { Motion, Presence } from '@motionone/solid'
import { twMerge } from 'tailwind-merge'
import { Dynamic } from 'solid-js/web'
import { ChapterOptions, TOptionGroup } from '~/components/ChapterPicker/ChapterOption'
import { Capped } from '~/cap-ui'
import { range } from 'ramda'
import { bookList } from '~/state/books.state'

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ChapterPickerProps = {
	context?: Partial<Parameters<typeof combobox.machine>[0]>
	placeholder?: string
	setApiRef?: (ref: ComboboxApi) => void
	stylesOverride?: Partial<typeof comboboxStyles>
}

const bookOptionList = createMemo<TOptionGroup[]>(() =>
	bookList().map(({ name, chapter_count, code }) => {
		const options = range(1, chapter_count + 1).map((chapter) => ({
			value: chapter,
			label: chapter.toString(),
			disabled: false,
		}))
		return {
			label: name,
			bookCode: code,
			options,
		}
	})
)

const { option, option_focused } = comboboxStyles

const ChapterPicker = (props: ChapterPickerProps) => {
	const [options, setOptions] = createSignal(bookOptionList())

	const [selectedBookLabel, setSelectedBookLabel] = createSignal<string | null>(null)

	const [state, send] = useMachine(
		combobox.machine({
			id: createUniqueId(),
			onOpen() {
				setOptions(bookOptionList())
			},
			onInputChange({ value }) {
				setSelectedBookLabel(null)
				// const filtered =
				// 	props?.optionList?.filter((item) =>
				// 		item.label.toLowerCase().includes(value.toLowerCase())
				// 	) || []
				// setOptions(filtered.length > 0 ? filtered : props.optionList)
			},
			...props.context,
		})
	)

	const api = createMemo(() => combobox.connect(state, send, normalizeProps))

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
	})

	createEffect(() => {
		on(
			() => bookOptionList(),
			() => setOptions(bookOptionList())
		)
	})

	const positionerProps = createMemo(() => {
		const positionerProps = { ...api().positionerProps }
		// @ts-ignore
		delete positionerProps.style['min-width']
		return positionerProps
	})

	const [isChaptersHovered, setIsChaptersHovered] = createSignal(false)

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
									{(optionGroup, index) => {
										const [optionEl, setOptionEl] = createSignal(null as unknown as HTMLElement)

										const handleBookOptionClick = () => {
											setSelectedBookLabel(
												selectedBookLabel() === optionGroup.label ? null : optionGroup.label
											)
											optionEl().scrollIntoView({
												behavior: 'smooth',
												block: 'nearest',
												inline: 'nearest',
											})
										}

										const showChapters = createMemo(() => selectedBookLabel() === optionGroup.label)

										return (
											<div ref={setOptionEl}>
												<Capped
													component="li"
													fontSize={'sm'}
													onClick={handleBookOptionClick}
													class={twMerge(
														option,
														props.stylesOverride?.option,
														showChapters() && 'font-bold bg-primary-100'
													)}
												>
													<OptionLabel class={twMerge(props.stylesOverride?.optionLabel)}>
														{optionGroup.label}
													</OptionLabel>
												</Capped>

												<ChapterOptions
													optionGroup={optionGroup}
													onMouseEnter={() => setIsChaptersHovered(true)}
													onMouseLeave={() => setIsChaptersHovered(false)}
												/>
											</div>
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
