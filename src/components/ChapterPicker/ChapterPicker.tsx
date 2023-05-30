import { createSignal, For, JSX, Show } from 'solid-js'
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
import { TBook } from '~/model'
import { ChapterOptions } from '~/components/ChapterPicker/ChapterOption'
import { Capped } from '~/cap-ui'

type ChapterPickerOption = {
	value: TBook
	label: string
	disabled: boolean
}

export type ChapterPickerProps = {
	optionList: ChapterPickerOption[]
	initialOption?: ChapterPickerOption
	placeholder?: string
	stylesOverride?: Partial<typeof comboboxStyles>
}

const { option, option_focused } = comboboxStyles

const ChapterPicker = (props: ChapterPickerProps) => {
	const [selectedBookId, setSelectedBookId] = createSignal<number | null>(null)

	const [isChaptersHovered, setIsChaptersHovered] = createSignal(false)

	return (
		<Container class={props.stylesOverride?.container}>
			<div>
				<div>
					<Input placeholder={props.placeholder} class={twMerge(props.stylesOverride?.input)} />
					<InputButton class={props.stylesOverride?.inputButton}>
						<Icon name={'unfold_more'} />
					</InputButton>
				</div>
			</div>
			<Presence exitBeforeEnter>
				<Show when={isOpen}>
					<Motion.div
						initial={{ opacity: 0, scale: 0.75 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, easing: 'ease-out' } }}
						exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.1, easing: 'ease-in' } }}
					>
						<OptionContainer class={twMerge(props.stylesOverride?.optionContainer, 'max-h-[50vh]')}>
							<ul>
								<For each={props.optionList}>
									{(item, index) => {
										const [optionEl, setOptionEl] = createSignal(null as unknown as HTMLElement)

										const handleBookOptionClick = () => {
											setSelectedBookId(selectedBookId() === item.value.id ? null : item.value.id)
											optionEl().scrollIntoView({
												behavior: 'smooth',
												block: 'nearest',
												inline: 'nearest',
											})
										}

										return (
											<div ref={setOptionEl}>
												<Capped
													component="li"
													fontSize={'sm'}
													onClick={handleBookOptionClick}
													class={twMerge(
														option,
														props.stylesOverride?.option,
														selectedBookId() === item.value.id && 'font-bold bg-primary-100',
														focused &&
															!isChaptersHovered() &&
															(props.stylesOverride?.option_focused || option_focused)
													)}
												>
													<OptionLabel class={twMerge(props.stylesOverride?.optionLabel)}>
														{item.label}
													</OptionLabel>
												</Capped>
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
