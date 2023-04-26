import { createMemo, ValidComponent } from 'solid-js'
import { Dynamic, DynamicProps } from 'solid-js/web'
import { twMerge } from 'tailwind-merge'

export const withInitialClass = <T extends ValidComponent>(defaultClasses: string, Component: T) => {
    return (props: Omit<DynamicProps<T>, 'component'> & { statefulClasses?: Record<string, boolean> }) => {
        const statefulClassesToApply = createMemo(
            () =>
                props.statefulClasses &&
                Object.entries(props.statefulClasses).reduce(
                    (classes, [className, isActive]) => (isActive ? `${classes} ${className}` : classes),
                    ''
                )
        )

        return (
            // @ts-ignore
            <Dynamic
                component={Component}
                {...props}
                class={twMerge(defaultClasses, props.class, statefulClassesToApply())}
            />
        )
    }
}
