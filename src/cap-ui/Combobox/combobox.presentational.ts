import {withInitialClass} from '../meta/withInitialClass'
import {comboboxStyles} from './combobox.styles'

const {container, input, inputButton, optionContainer, option, optionLabel, optionIcon} =
    comboboxStyles

export const Container = withInitialClass(container, 'div')
export const Input = withInitialClass(input, 'input')
export const InputButton = withInitialClass(inputButton, 'button')
export const OptionContainer = withInitialClass(optionContainer, 'div')
export const Option = withInitialClass(option, 'li')
export const OptionLabel = withInitialClass(optionLabel, 'span')
export const OptionIcon = withInitialClass(optionIcon, 'span')
