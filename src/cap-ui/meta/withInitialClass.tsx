import { ValidComponent } from 'solid-js'
import { Dynamic, DynamicProps } from 'solid-js/web'
import { twMerge } from 'tailwind-merge'

export const withInitialClass = <T extends ValidComponent>(
  defaultClasses: string,
  Component: T
) => (props: Omit<DynamicProps<T>, 'component'>) => (
      // @ts-ignore
      <Dynamic component={Component} {...props} class={twMerge(defaultClasses, props.class)} />
    )
