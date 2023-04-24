import { createStyleString } from '@capsizecss/core'
import fontMetrics from '@capsizecss/metrics/dMSans'

export const capsizeStyleRule = createStyleString('capsize', {
    capHeight: 18,
    lineGap: 45,
    fontMetrics,
})
