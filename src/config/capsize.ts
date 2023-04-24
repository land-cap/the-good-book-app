import { createStyleObject } from '@capsizecss/core'
import fontMetrics from '@capsizecss/metrics/dMSans'

const rawCapsizeStyles = createStyleObject({
    capHeight: 14,
    lineGap: 32,
    fontMetrics,
})

export const capsizeStyles = Object.entries(rawCapsizeStyles).reduce((acc, [key, value]) => {
    const newKey = key == '::before' || key == '::after' ? `&${key}` : key
    return {
        ...acc,
        [newKey]: value,
    }
}, {} as ReturnType<typeof createStyleObject>)
