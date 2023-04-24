import * as combobox from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createSignal, createUniqueId, For, onMount, Show } from 'solid-js'
import { twMerge } from 'tailwind-merge'

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
        <div class={'w-full sm:w-48'}>
            <div {...api().rootProps}>
                <div {...api().controlProps} class="relative">
                    <input
                        {...api().inputProps}
                        class="w-full border-0 bg-offWhite dark:bg-gray-800 py-1.5 pl-3 pr-12 shadow-sm ring-2 ring-inset ring-black dark:ring-whiteOnDark focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-500 sm:text-sm sm:leading-6"
                        placeholder={props.placeholder}
                    />
                    <button
                        {...api().triggerProps}
                        class="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                    >
                        <span
                            class="material-symbols-sharp text-[20px] h-5 w-5 text-black dark:text-whiteOnDark"
                            style={{ 'font-variation-settings': "'FILL' 1, 'wght' 600, 'opsz' 20" }}
                        >
                            unfold_more
                        </span>
                    </button>
                </div>
            </div>
            <div
                {...api().positionerProps}
                class="z-10 -mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
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
                                    <li
                                        {...api().getOptionProps({
                                            label: item.label,
                                            value: item.label,
                                            index: index(),
                                            disabled: item.disabled,
                                        })}
                                        class={twMerge(
                                            'relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900',
                                            optionState()?.focused && 'bg-primary-500 text-white',
                                            optionState().checked && 'font-black'
                                        )}
                                    >
                                        <span class="block truncate">{item.label}</span>
                                        {optionState().checked && (
                                            <span
                                                class={twMerge(
                                                    'absolute inset-y-0 right-0 flex items-center pr-2 text-primary-500',
                                                    optionState()?.focused && 'text-white'
                                                )}
                                            >
                                                <span
                                                    class="w-5 h-5 material-symbols-sharp text-[20px]"
                                                    style={{
                                                        'font-variation-settings': "'FILL' 1, 'wght' 600, 'opsz' 20",
                                                    }}
                                                >
                                                    check
                                                </span>
                                            </span>
                                        )}
                                    </li>
                                )
                            }}
                        </For>
                    </ul>
                </Show>
            </div>
        </div>
    )
}
