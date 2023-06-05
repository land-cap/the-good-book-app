import { createMemo, createSignal, For, onMount, Show } from 'solid-js'
import { Motion, Presence } from '@motionone/solid'
import { OptionContainer } from '~/cap-ui/Combobox/combobox.presentational'
import { twMerge } from 'tailwind-merge'
import { OptionGroup, TOptionGroup } from '~/components/ChapterPicker/OptionGroup'
import * as combobox from '@zag-js/combobox'
import { comboboxStyles } from '~/cap-ui'
import { useIsBreakpoint } from '~/hooks'
import { navbarHeight } from '~/components/AppShell/NavBar'
import { isBrowserUi } from '~/App'

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
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})

	const mobileMenuBottomSpacing = createMemo(() => (isBrowserUi() ? '24px + 12px' : '80px + 12px'))

	const maxHeightValue = createMemo(
		() =>
			`calc(${windowHeight()}px - ${navbarHeight()}px - ${
				isDesktop() ? '128px + 10px' : mobileMenuBottomSpacing()
			})`
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
						class={twMerge(
							props.stylesOverride?.optionContainer,
							'transition-[max-height] duration-300 ease-in-out'
						)}
						style={{ 'max-height': maxHeightValue() }}
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
