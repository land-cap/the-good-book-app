import { normalizeProps, useMachine } from '@zag-js/solid'
import * as pressable from '@zag-js/pressable'
import { Dynamic, DynamicProps } from 'solid-js/web'
import { createMemo, createUniqueId, onMount, ValidComponent } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { pressableStyles } from '~/cap-ui/Pressable/pressable.styles'

export type PressableApi = ReturnType<typeof pressable.connect>

export type PressableProps = {
	context?: Partial<Parameters<typeof pressable.machine>[0]>
	variant?: keyof typeof pressableStyles.variant
	size?: keyof typeof pressableStyles.size
	setApiRef?: (ref: PressableApi) => void
}

export const Pressable = <T extends ValidComponent>(
	props: Omit<DynamicProps<T>, 'component'> & {
		component?: ValidComponent
	} & PressableProps
) => {
	const [state, send] = useMachine(
		pressable.machine({
			id: createUniqueId(),
			preventFocusOnPress: true,
			// eslint-disable-next-line solid/reactivity
			...props.context,
		})
	)

	const classList = createMemo(() =>
		twMerge(
			pressableStyles.base,
			props.variant ? pressableStyles.variant[props.variant] : pressableStyles.variant.primary,
			props.size ? pressableStyles.size[props.size] : pressableStyles.size.md
		)
	)

	const api = createMemo(() => pressable.connect(state, send, normalizeProps))

	onMount(() => {
		if (props.setApiRef) {
			props.setApiRef(api())
		}
	})

	return (
		<Dynamic
			component={props.component || 'button'}
			{...api().pressableProps}
			{...props}
			class={twMerge(classList(), props.class)}
		/>
	)
}
