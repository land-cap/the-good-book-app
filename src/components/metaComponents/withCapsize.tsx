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
    '2xl': { capHeight: 17, lineGap: 17 },
    '3xl': { capHeight: 21, lineGap: 21 },
    '4xl': { capHeight: 26, lineGap: 26 },
    '5xl': { capHeight: 34, lineGap: 34 },
    '6xl': { capHeight: 42, lineGap: 42 },
    '7xl': { capHeight: 50, lineGap: 50 },
    '8xl': { capHeight: 66, lineGap: 66 },
    '9xl': { capHeight: 89, lineGap: 89 },
}

export const withCapsize = <T extends ValidComponent>(component: T) => {
    return (props: Omit<DynamicProps<T>, 'component'>) => {
        index = index + 1
        const fontSizeRegex = new RegExp(`^text-(${Object.keys(fontSizeToCapHeight).join('|')})\$`)
        const fontClass = (props.class as string)?.split(' ').find((cl) => cl.match(fontSizeRegex))
        const classWithoutFontSize = (props.class as string)
            ?.split(' ')
            .filter((cl) => !cl.match(fontSizeRegex))
            .join(' ')
        const fontSize = fontClass?.replace('text-', '')
        console.log(fontSize)
        // const idClass = `${className}-${index}`
        const styleString = createStyleString(`capsize-${fontSize}`, {
            ...fontSizeToCapHeight[fontSize],
            fontMetrics,
        })
        console.log(styleString)

        return (
            <>
                <Style>{styleString}</Style>
                <Dynamic component={component} {...props} class={`${classWithoutFontSize} capsize-${fontSize}`} />
            </>
        )
    }
}
