import { Dynamic, DynamicProps } from 'solid-js/web'
import { ValidComponent } from 'solid-js'
import { createStyleString } from '@capsizecss/core'
import fontMetrics from '@capsizecss/metrics/dMSans'
import { Style } from '@solidjs/meta'

const className = 'capsize'
let index = 0

export const withCapsize = <T extends ValidComponent>(component: T, capHeight: number, lineGap: number) => {
    const idClass = `${className}-${index}`
    const styleString = createStyleString(idClass, { capHeight, lineGap, fontMetrics })

    index = index + 1

    return (props: Omit<DynamicProps<T>, 'component'>) => (
        <>
            <Style>{styleString}</Style>
            <Dynamic component={component} {...props} class={`${props.class} ${idClass}`} />
        </>
    )
}
