import { normalizeProps, useMachine } from '@zag-js/solid'
import * as pressable from '@zag-js/pressable'
import { Dynamic, DynamicProps } from 'solid-js/web'
import { createMemo, createUniqueId, ValidComponent } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { pressableStyles } from '~/cap-ui/Pressable/pressable.styles'

export type PressableProps = {
    context?: Partial<Parameters<typeof pressable.machine>[0]>
    variant?: keyof typeof pressableStyles.variant
    size?: keyof typeof pressableStyles.size
}

export const Pressable = <T extends ValidComponent>({
    context,
    variant,
    size,
    component,
    ...props
}: Omit<DynamicProps<T>, 'component'> & {
    component?: ValidComponent
} & PressableProps) => {
    const [state, send] = useMachine(
        pressable.machine({
            id: createUniqueId(),
            preventFocusOnPress: true,
            ...context,
        })
    )

    const classList = twMerge(
        pressableStyles.base,
        variant ? pressableStyles.variant[variant] : pressableStyles.variant.primary,
        size ? pressableStyles.size[size] : pressableStyles.size.md
    )

    const api = createMemo(() => pressable.connect(state, send, normalizeProps))

    return <Dynamic component={component || 'button'} {...props} class={twMerge(classList, props.class)} />
}
