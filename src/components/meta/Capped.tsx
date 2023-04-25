import { Dynamic, DynamicProps } from 'solid-js/web'
import { ValidComponent } from 'solid-js'
import { styled, StylesFn } from 'solid-styled-components'

const styledDynamic = styled(Dynamic as unknown as Parameters<typeof styled>[0]) as unknown as StylesFn<'div'>

export const Capped = <T extends ValidComponent, >(props: DynamicProps<T>) => {
    const Component = styledDynamic({ 'background': 'yellow' }) as unknown as typeof Dynamic
    return <Component {...props} />
}


