import { ValidComponent } from 'solid-js'
import { Dynamic, DynamicProps } from 'solid-js/web'
import { twMerge } from 'tailwind-merge'

export const withInitialClass = <T extends ValidComponent>(className: string, Component: T) =>
    ((props: DynamicProps<T>) => (
        // @ts-ignore
        <Dynamic component={Component} {...props} class={twMerge(className, props.class)} />
    )) as T
