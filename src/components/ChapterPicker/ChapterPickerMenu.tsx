import { createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import { Motion, Presence } from '@motionone/solid'
import { OptionContainer } from '~/cap-ui/Combobox/combobox.presentational'
import { twMerge } from 'tailwind-merge'
import { OptionGroup, TOptionGroup } from '~/components/ChapterPicker/OptionGroup'
import * as combobox from '@zag-js/combobox'
import { comboboxStyles } from '~/cap-ui'
import { useIsBreakpoint } from '~/hooks'

type TChapterPickerMenuProps = {
	options: TOptionGroup[]
	comboboxApi: ReturnType<typeof combobox.connect>
	menuTopOffset: number
	stylesOverride?: Partial<typeof comboboxStyles>
}

export const ChapterPickerMenu = (props: TChapterPickerMenuProps) => {
	const isDesktop = useIsBreakpoint('sm')

	const [windowHeight, setWindowHeight] = createSignal(window.innerHeight)

	onMount(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight)
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})

	createEffect(() => {
		if (document.body && props.comboboxApi.isOpen) {
			document.body.style.overflow = 'hidden'
		} else if (!props.comboboxApi.isOpen) {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	})

	const maxHeightValue = createMemo(() => `calc(100vh - ${props.menuTopOffset}px - 144px)`)

	return (
		<Presence exitBeforeEnter>
			<Show when={props.comboboxApi.isOpen}>
				<Motion.div
					initial={{ opacity: 0, scale: 0.75 }}
					animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, easing: 'ease-out' } }}
					exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.1, easing: 'ease-in' } }}
				>
					<OptionContainer
						class={twMerge(
							props.stylesOverride?.optionContainer,
							'sm:max-h-[60vh]',
							!isDesktop() && 'transition-[max-height] duration-300 ease-in-out'
						)}
						style={!isDesktop() ? { 'max-height': maxHeightValue() } : undefined}
					>
						<ul {...props.comboboxApi.contentProps}>
							<For each={props.options}>
								{(optionGroup, groupIndex) => (
									<OptionGroup
										optionGroup={optionGroup}
										comboboxApi={props.comboboxApi}
										groupIndex={groupIndex()}
									/>
								)}
							</For>
						</ul>
					</OptionContainer>
				</Motion.div>
			</Show>
		</Presence>
	)
}
