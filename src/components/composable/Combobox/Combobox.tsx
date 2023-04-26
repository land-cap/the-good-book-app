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
} from '~/components/composable/Combobox/combobox.presentational'
import { defaultComboboxStyles } from '~/components/composable/Combobox/combobox.styles'

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
}

const { option_focused, option_checked, optionIcon_focused } = defaultComboboxStyles

export const Combobox = (props: ComboboxProps) => {
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
            ...props.context,
        })
    )

    const api = createMemo(() => combobox.connect(state, send, normalizeProps))

    onMount(() => {
        if (props.setApiRef) {
            props.setApiRef(api())
        }
        if (props.defaultValue) {
            api().setValue(props.defaultValue)
        }
    })

    return (
        <Container>
            <div {...api().rootProps}>
                <div {...api().controlProps}>
                    <Input placeholder={props.placeholder} {...api().inputProps} />
                    <InputButton {...api().triggerProps}>
                        <Icon name={'unfold_more'} />
                    </InputButton>
                </div>
            </div>
            <OptionContainer {...api().positionerProps}>
                <Show when={options().length > 0}>
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
                                        statefulClasses={{
                                            [option_focused]: optionState()?.focused,
                                            [option_checked]: optionState()?.checked,
                                        }}
                                        {...api().getOptionProps({
                                            label: item.label,
                                            value: item.label,
                                            index: index(),
                                            disabled: item.disabled,
                                        })}
                                    >
                                        <OptionLabel class="block truncate">{item.label}</OptionLabel>
                                        {optionState().checked && (
                                            <OptionIcon
                                                statefulClasses={{ [optionIcon_focused]: optionState()?.focused }}
                                            >
                                                <Icon name={'check'} />
                                            </OptionIcon>
                                        )}
                                    </Option>
                                )
                            }}
                        </For>
                    </ul>
                </Show>
            </OptionContainer>
        </Container>
    )
}
