import { Dynamic, DynamicProps } from 'solid-js/web'
import { styled, StylesFn } from 'solid-styled-components'
import { JSX, ValidComponent } from 'solid-js'
import dmSansMetrics from '@capsizecss/metrics/dMSans'
import dmMonoMetrics from '@capsizecss/metrics/dMMono'
import { createStyleObject } from '@capsizecss/core'
import { FontSize, fontSizeToCapHeight } from '~/config/fontSize'

const styledDynamic = styled(
	Dynamic as unknown as Parameters<typeof styled>[0]
) as unknown as StylesFn<'div'>

export type CappedComponent = <T extends ValidComponent>(
	props: DynamicProps<T> & {
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

export const Capped = styledDynamic<{
	fontSize: FontSize | number
	lineGap?: number
	class?: string
	mono?: boolean
}>((props) => {
	const styles = createStyleObject({
		capHeight:
			typeof props.fontSize === 'number'
				? props.fontSize
				: fontSizeToCapHeight[props.fontSize]?.capHeight || fontSizeToCapHeight.base.capHeight,
		lineGap:
			props.lineGap ||
			fontSizeToCapHeight[props.fontSize]?.lineGap ||
			fontSizeToCapHeight.base.lineGap,
		fontMetrics: props.mono ? dmMonoMetrics : dmSansMetrics,
	})

	return fixStyleObject(styles)
}) as unknown as CappedComponent
