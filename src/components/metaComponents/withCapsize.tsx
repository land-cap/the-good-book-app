import { Dynamic, DynamicProps } from 'solid-js/web'
import { ValidComponent } from 'solid-js'
import fontMetrics from '@capsizecss/metrics/dMSans'
import { createStyleString } from '@capsizecss/core'
import { Style } from '@solidjs/meta'

const className = 'capsize'
let index = 0

const fontSizeToCapHeight: Record<string, { capHeight: number; lineGap: number }> = {
    xs: { capHeight: 8, lineGap: 8 },
    sm: { capHeight: 10, lineGap: 10 },
    base: { capHeight: 11, lineGap: 11 },
    lg: { capHeight: 13, lineGap: 13 },
    xl: { capHeight: 14, lineGap: 14 },
}

export const withCapsize = <T extends ValidComponent>(component: T) => {
    return (props: Omit<DynamicProps<T>, 'component'>) => {
        index = index + 1
        const fontSizeRegex = /^text-(xs|sm|base|lg|xl)$/
        const fontClass = (props.class as string)?.split(' ').find((cl) => cl.match(fontSizeRegex))
        const classWithoutFontSize = (props.class as string)
            ?.split(' ')
            .filter((cl) => !cl.match(fontSizeRegex))
            .join(' ')
        const fontSize = fontClass?.replace('text-', '')
        console.log(fontSize)
        // const idClass = `${className}-${index}`
        const styleString = createStyleString(fontSize as string, { ...fontSizeToCapHeight[fontSize], fontMetrics })

        return (
            <>
                <Style>{styleString}</Style>
                <Dynamic component={component} {...props} class={`${classWithoutFontSize} ${fontSize}`} />
            </>
        )
    }
}
