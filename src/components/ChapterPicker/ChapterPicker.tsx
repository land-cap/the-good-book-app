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
	Option,
	OptionContainer,
	OptionLabel,
} from '~/cap-ui/Combobox/combobox.presentational'
import { comboboxStyles } from '~/cap-ui/Combobox/combobox.styles'
import { Motion, Presence } from '@motionone/solid'
import { twMerge } from 'tailwind-merge'
import { Dynamic } from 'solid-js/web'
import { TBook } from '~/model'
import { ChapterOptions } from '~/components/ChapterPicker/ChapterOption'

type ChapterPickerOption = {
	value: TBook
	label: string
	disabled: boolean
}

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ChapterPickerProps = {
	context?: Partial<Parameters<typeof combobox.machine>[0]>
	optionList: ChapterPickerOption[]
	initialOption?: ChapterPickerOption
	placeholder?: string
	setApiRef?: (ref: ComboboxApi) => void
	stylesOverride?: Partial<typeof comboboxStyles>
}

const { option_focused, option_checked, optionIcon_focused } = comboboxStyles

const ChapterPicker = (props: ChapterPickerProps) => {
	const [options, setOptions] = createSignal(props.optionList)

	const [selectedBookId, setSelectedBookId] = createSignal(null as unknown as number)

	const [state, send] = useMachine(
		combobox.machine({
			id: createUniqueId(),
			onOpen() {
				setOptions(props.optionList)
			},
			// onSelect({ chapter }) {},
			onInputChange({ value }) {
				const filtered =
					props?.optionList?.filter((item) =>
						item.label.toLowerCase().includes(value.toLowerCase())
					) || []
				setOptions(filtered.length > 0 ? filtered : props.optionList)
			},
			...props.context,
		})
	)

	const api = createMemo(() => combobox.connect(state, send, normalizeProps))

	createEffect(
		on(
			() => props.initialOption,
			() => {
				if (props.initialOption && api()) {
					api().setValue({ value: props.initialOption.label, label: props.initialOption.label })
				}
			}
		)
	)

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
	})

	createEffect(() => {
		on(
			() => props.optionList,
			() => setOptions(props.optionList)
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
							class={twMerge(props.stylesOverride?.optionContainer)}
						>
							<ul {...api().contentProps}>
								<For each={options()}>
									{(item, index) => {
										const optionState = createMemo(() =>
											api().getOptionState({
												label: item.label,
												value: item.label,
												index: index(),
												disabled: item.disabled,
											})
										)

										const { onClick, onPointerUp, ...optionProps } = api().getOptionProps({
											label: item.label,
											value: item.label,
											index: index(),
											disabled: item.disabled,
										})

										const handleBookOptionClick = () => setSelectedBookId(item.value.id)

										return (
											<>
												<Option
													{...optionProps}
													onClick={handleBookOptionClick}
													class={twMerge(
														props.stylesOverride?.option,
														selectedBookId() === item.value.id && 'font-bold',
														optionState()?.focused &&
															!isChaptersHovered() &&
															(props.stylesOverride?.option_focused || option_focused)
													)}
												>
													<OptionLabel class={props.stylesOverride?.optionLabel}>
														{item.label}
													</OptionLabel>
												</Option>
												{selectedBookId() === item.value.id ? (
													<div
														onMouseEnter={() => setIsChaptersHovered(true)}
														onMouseLeave={() => setIsChaptersHovered(false)}
													>
														<ChapterOptions
															chapterCount={item.value.chapter_count}
															bookCode={item.value.code}
														/>
													</div>
												) : null}
											</>
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
