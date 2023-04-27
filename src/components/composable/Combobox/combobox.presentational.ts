import { withInitialClass } from '~/components/meta/withInitialClass'
import { defaultComboboxStyles } from '~/components/composable/Combobox/combobox.styles'
import { Motion } from '@motionone/solid'

const { container, input, inputButton, optionContainer, option, optionLabel, optionIcon } = defaultComboboxStyles

export const Container = withInitialClass(container, 'div')
export const Input = withInitialClass(input, 'input')
export const InputButton = withInitialClass(inputButton, 'button')
export const OptionContainer = withInitialClass(optionContainer, Motion.div)
export const Option = withInitialClass(option, 'li')
export const OptionLabel = withInitialClass(optionLabel, 'span')
export const OptionIcon = withInitialClass(optionIcon, 'span')
