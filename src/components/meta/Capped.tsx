import { Dynamic, DynamicProps } from 'solid-js/web'
import { styled, StylesFn } from 'solid-styled-components'
import { JSX, ValidComponent } from 'solid-js'

const styledDynamic = styled(Dynamic as unknown as Parameters<typeof styled>[0]) as unknown as StylesFn<'div'>

export type CappedComponent = <T extends ValidComponent>(props: DynamicProps<T> & { lineHeight: number }) => JSX.Element

export const Capped = styledDynamic((props: { lineHeight: number; class?: string }) => {
    if (props.class?.includes('leading')) throw new Error('Capped component cannot have leading class')
    return {
        lineHeight: props.lineHeight,
        '&:before': {
            content: `''`,
            marginBottom: `${-props.lineHeight / 2 + 0.5 - 0.135}em`,
            display: 'table',
        },
        '&:after': {
            content: `''`,
            marginTop: `${-props.lineHeight / 2 + 0.5 - 0.16}em`,
            display: 'table',
        },
    }
}) as unknown as CappedComponent
