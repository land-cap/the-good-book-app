import { Dynamic, DynamicProps } from 'solid-js/web'
import { ValidComponent } from 'solid-js'
import { createStyleString } from '@capsizecss/core'
import fontMetrics from '@capsizecss/metrics/dMSans'

const className = 'capsize'
let index = 0

export const withCapsize = <T extends ValidComponent>(component: T, capHeight: number, lineGap: number) => {
    const idClass = `${className}-${index}`
    const styleString = createStyleString(idClass, { capHeight, lineGap, fontMetrics })
    if (typeof document !== 'undefined') {
        const styleElement = document.createElement('style')
        styleElement.textContent = styleString
        document.head.appendChild(styleElement)
    }
    index = index + 1

    // @ts-ignore
    return (props: Omit<DynamicProps<T>, 'component'>) => <Dynamic component={component} {...props} class={idClass} />
}
