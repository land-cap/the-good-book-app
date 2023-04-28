import { Dynamic } from 'solid-js/web';
import { styled } from 'solid-styled-components';
import fontMetrics from '@capsizecss/metrics/dMMono';
import { createStyleObject } from '@capsizecss/core';
import { fontSizeToCapHeight } from '~/config/fontSize';
const styledDynamic = styled(Dynamic);
const fixStyleObject = (rawStyles) => Object.entries(rawStyles).reduce((acc, [key, value]) => {
    const newKey = key == '::before' || key == '::after' ? `&${key}` : key;
    return {
        ...acc,
        [newKey]: value,
    };
}, {});
export const Capd = styledDynamic(({ fontSize, lineGap, className, }) => {
    if (className?.includes('leading'))
        throw new Error('Capd component cannot have leading class');
    const styles = createStyleObject({
        capHeight: typeof fontSize === 'number'
            ? fontSize
            : fontSizeToCapHeight[fontSize]?.capHeight || fontSizeToCapHeight.base.capHeight,
        lineGap: lineGap || fontSizeToCapHeight[fontSize]?.lineGap || fontSizeToCapHeight.base.lineGap,
        fontMetrics,
    });
    return fixStyleObject(styles);
});
