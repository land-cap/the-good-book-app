import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createSignal, createUniqueId, For, onMount, Show } from 'solid-js'
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
import { withCustomStyles } from '~/cap-ui'

type ComboboxOption = {
    label: string
    disabled: boolean
}

export type ComboboxApi = ReturnType<typeof combobox.connect>

export type ComboboxProps = {
    context?: Partial<Parameters<typeof combobox.machine>[0]>
    options: ComboboxOption[]
    defaultValue?: string
    placeholder?: string
    setApiRef?: (ref: ComboboxApi) => void
    stylesOverride?: Partial<typeof comboboxStyles>
}

const { option_focused, option_checked, optionIcon_focused } = comboboxStyles

export const Combobox = ({
    context,
    defaultValue,
    placeholder,
    stylesOverride,
    setApiRef,
    ...props
}: ComboboxProps) => {
    const [options, setOptions] = createSignal(props.options)

    const [state, send] = useMachine(
        combobox.machine({
            id: createUniqueId(),
            onOpen() {
                setOptions(props.options)
            },
            onInputChange({ value }) {
                const filtered = props.options.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
                setOptions(filtered.length > 0 ? filtered : props.options)
            },
            ...context,
        })
    )

    const api = createMemo(() => combobox.connect(state, send, normalizeProps))

    onMount(() => {
        if (setApiRef) {
            setApiRef(api())
        }
        if (defaultValue && api()) {
            api().setValue({ value: defaultValue, label: defaultValue })
        }
    })

    return (
        <Container class={stylesOverride?.container}>
            <div {...api().rootProps}>
                <div {...api().controlProps}>
                    <Input placeholder={placeholder} {...api().inputProps} class={twMerge(stylesOverride?.input)} />
                    <InputButton {...api().triggerProps} class={stylesOverride?.inputButton}>
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
                        <OptionContainer {...api().positionerProps} class={stylesOverride?.optionContainer}>
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
                                                    stylesOverride?.option,
                                                    optionState()?.focused &&
                                                        (stylesOverride?.option_focused || option_focused),
                                                    optionState()?.checked &&
                                                        (stylesOverride?.option_checked || option_checked)
                                                )}
                                            >
                                                <OptionLabel class={stylesOverride?.optionLabel}>
                                                    {item.label}
                                                </OptionLabel>
                                                {optionState().checked && (
                                                    <OptionIcon
                                                        class={twMerge(
                                                            stylesOverride?.optionIcon,
                                                            optionState()?.focused &&
                                                                (stylesOverride?.optionIcon_focused ||
                                                                    optionIcon_focused)
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

export const StyledCombobox = withCustomStyles(Combobox, {
    container: 'z-10',
    input: 'rounded-none ring-2 ring-black dark:ring-whiteOnDark',
    optionContainer: 'rounded-none',
    inputButton: 'text-black dark:text-whiteOnDark hover:text-primary-600 dark:hover:text-primary-500',
})
