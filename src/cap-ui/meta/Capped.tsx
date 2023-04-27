import { Dynamic } from 'solid-js/web'
import { styled, StylesFn } from 'solid-styled-components'
import { JSX } from 'solid-js'
import fontMetrics from '@capsizecss/metrics/dMSans'
import { createStyleObject } from '@capsizecss/core'
import { FontSize, fontSizeToCapHeight } from '~/config/fontSize'

const styledDynamic = styled(Dynamic as unknown as Parameters<typeof styled>[0]) as unknown as StylesFn<'div'>

export type CappedComponent = <T>(
    props: T & {
        fontSize?: FontSize | number
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

export const Capped = styledDynamic((props: { fontSize: FontSize | number; lineGap?: number; class?: string }) => {
    if (props.class?.includes('leading')) throw new Error('Capped component cannot have leading class')

    const styles = createStyleObject({
        capHeight:
            typeof props.fontSize === 'number'
                ? props.fontSize
                : fontSizeToCapHeight[props.fontSize]?.capHeight || fontSizeToCapHeight.base.capHeight,
        lineGap: props.lineGap || fontSizeToCapHeight[props.fontSize]?.lineGap || fontSizeToCapHeight.base.lineGap,
        fontMetrics,
    })

    return fixStyleObject(styles)
}) as unknown as CappedComponent
