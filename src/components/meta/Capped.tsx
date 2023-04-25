import { Dynamic, DynamicProps } from 'solid-js/web'
import { styled, StylesFn } from 'solid-styled-components'
import { JSX, ValidComponent } from 'solid-js'
import fontMetrics from '@capsizecss/metrics/dMSans'
import { createStyleObject } from '@capsizecss/core'

const styledDynamic = styled(Dynamic as unknown as Parameters<typeof styled>[0]) as unknown as StylesFn<'div'>

export type CappedComponent = <T extends ValidComponent>(
    props: DynamicProps<T> & {
        capHeight: number
        lineGap?: number
    }
) => JSX.Element

const fixStyleObject = (rawStyles: ReturnType<typeof createStyleObject>) =>
    Object.entries(rawStyles).reduce((acc, [key, value]) => {
        const newKey = key == '::before' || key == '::after' ? `&${key}` : key
        return {
            ...acc,
            [newKey]: value,
        }
    }, {} as ReturnType<typeof createStyleObject>)

export const Capped = styledDynamic((props: { capHeight: number; lineGap?: number; class?: string }) => {
    if (props.class?.includes('leading')) throw new Error('Capped component cannot have leading class')
    const styles = createStyleObject({
        capHeight: props.capHeight,
        lineGap: props.lineGap || 1,
        fontMetrics,
    })
    return fixStyleObject(styles)
}) as unknown as CappedComponent
