import { createMemo, For, Show } from 'solid-js'
import { Motion, Presence } from '@motionone/solid'
import { OptionContainer } from '~/cap-ui/Combobox/combobox.presentational'
import { twMerge } from 'tailwind-merge'
import { OptionGroup, TOptionGroup } from '~/components/ChapterPicker/OptionGroup'
import * as combobox from '@zag-js/combobox'
import { comboboxStyles } from '~/cap-ui'

type TChapterPickerMenuProps = {
	options: TOptionGroup[]
	comboboxApi: ReturnType<typeof combobox.connect>
	stylesOverride?: Partial<typeof comboboxStyles>
}

export const ChapterPickerMenu = (props: TChapterPickerMenuProps) => {
	const positionerProps = createMemo(() => {
		const positionerProps = { ...props.comboboxApi.positionerProps }
		// @ts-ignore
		delete positionerProps.style['min-width']
		return positionerProps
	})

	return (
		<Presence exitBeforeEnter>
			<Show when={props.comboboxApi.isOpen}>
				<Motion.div
					initial={{ opacity: 0, scale: 0.75 }}
					animate={{ opacity: 1, scale: 1, transition: { duration: 0.1, easing: 'ease-out' } }}
					exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.1, easing: 'ease-in' } }}
				>
					<OptionContainer
						{...positionerProps}
						class={twMerge(props.stylesOverride?.optionContainer, 'max-h-[75vh] sm:max-h-[50vh]')}
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
