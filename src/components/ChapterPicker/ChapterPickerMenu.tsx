import { createMemo, createSignal, For, Show } from 'solid-js'
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

const [resizeCount, setResizeCount] = createSignal(0)

window.onresize = () => {
	setResizeCount(resizeCount() + 1)
}

export const ChapterPickerMenu = (props: TChapterPickerMenuProps) => {
	const isDesktop = useIsBreakpoint('sm')

	const maxHeightvalue = createMemo(
		() => `calc(${window.innerHeight}px - ${props.menuTopOffset}px - 10px - 24px)`
	)

	return (
		<Presence exitBeforeEnter>
			<Show when={props.comboboxApi.isOpen}>
				<Motion.div
					initial={{ opacity: 0, scale: 0.75 }}
					animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, easing: 'ease-out' } }}
					exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.1, easing: 'ease-in' } }}
				>
					<OptionContainer
						class={twMerge(props.stylesOverride?.optionContainer, 'sm:max-h-[50vh]')}
						style={!isDesktop() ? { 'max-height': maxHeightvalue() } : undefined}
					>
						<ul {...props.comboboxApi.contentProps}>
							{resizeCount()}
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
