import { Dynamic } from 'solid-js/web'
import { styled, StylesFn } from 'solid-styled-components'

const styledDynamic = styled(Dynamic as unknown as Parameters<typeof styled>[0]) as unknown as StylesFn<'div'>

export const Capped = styledDynamic((props: {
    LineHeight?: number
}) => {
    return {
        '&:before': {
            content: `''`,
            marginBottom: '-0.135em',
            display: 'table',
        },
        '&:after': {
            content: `''`,
            marginTop: '-0.16em',
            display: 'table',
        },
    }
}) as unknown as typeof Dynamic



