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
	OptionIcon,
	OptionLabel,
} from '~/cap-ui/Combobox/combobox.presentational'
import { comboboxStyles } from '~/cap-ui/Combobox/combobox.styles'
import { Motion, Presence } from '@motionone/solid'
import { twMerge } from 'tailwind-merge'
import { Dynamic } from 'solid-js/web'

type ComboboxOption = {
	value: string
	label: string
	disabled: boolean
}

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ComboboxProps = {
	context?: Partial<Parameters<typeof combobox.machine>[0]>
	options: ComboboxOption[]
	defaultValue?: ComboboxOption
	placeholder?: string
	setApiRef?: (ref: ComboboxApi) => void
	stylesOverride?: Partial<typeof comboboxStyles>
}

const { option_focused, option_checked, optionIcon_focused } = comboboxStyles

export const Combobox = (props: ComboboxProps) => {
	const [options, setOptions] = createSignal(props.options)

	createEffect(() => console.log('options', options()))

	createEffect(() => {
		on(
			() => props.options,
			() => setOptions(props.options)
		)
	})

	const [state, send] = useMachine(
		combobox.machine({
			id: createUniqueId(),
			onOpen() {
				setOptions(props.options)
			},
			onInputChange({ value }) {
				const filtered =
					props?.options?.filter((item) =>
						item.label.toLowerCase().includes(value.toLowerCase())
					) || []
				setOptions(filtered.length > 0 ? filtered : props.options)
			},
			...props.context,
		})
	)

	const api = createMemo(() => combobox.connect(state, send, normalizeProps))

	createEffect(
		on(
			() => props.defaultValue,
			() => {
				console.log('props.defaultValue updated', props.defaultValue)
				if (props.defaultValue && api()) {
					api().setValue(props.defaultValue)
				}
			}
		)
	)

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
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
							{...api().positionerProps}
							class={props.stylesOverride?.optionContainer}
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

										return (
											<Option
												{...api().getOptionProps({
													label: item.label,
													value: item.label,
													index: index(),
													disabled: item.disabled,
												})}
												class={twMerge(
													props.stylesOverride?.option,
													optionState()?.focused &&
														(props.stylesOverride?.option_focused || option_focused),
													optionState()?.checked &&
														(props.stylesOverride?.option_checked || option_checked)
												)}
											>
												<OptionLabel class={props.stylesOverride?.optionLabel}>
													{item.label}
												</OptionLabel>
												{optionState().checked && (
													<OptionIcon
														class={twMerge(
															props.stylesOverride?.optionIcon,
															optionState()?.focused &&
																(props.stylesOverride?.optionIcon_focused || optionIcon_focused)
														)}
													>
														<Icon name={'check'} />
													</OptionIcon>
												)}
											</Option>
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

export const StyledCombobox = withCustomStyles(Combobox, {
	input: 'rounded-none ring-2 shadow-none ring-gray-200 dark:ring-gray-700',
	optionContainer: 'rounded-none',
	inputButton: 'hover:text-primary-600 dark:hover:text-primary-500',
})
