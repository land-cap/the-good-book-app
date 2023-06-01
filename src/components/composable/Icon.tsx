import { twMerge } from 'tailwind-merge'

type IconSize = 20 | 24 | 40 | 48

const sizeToClass: Record<number, string> = {
	20: 'w-5 h-5 text-[20px]',
	24: 'w-5 h-5 text-[24px]',
	40: 'w-5 h-5 text-[40px]',
	48: 'w-5 h-5 text-[48px]',
}

export const Icon = (props: {
	name: string
	size?: IconSize
	class?: string
	inline?: boolean
}) => {
	const sizeClass = props.size ? sizeToClass[props.size] : sizeToClass[20]

	return (
		<span
			class={twMerge('material-icon', !props.inline && sizeClass, props.class)}
			style={{
				'font-variation-settings': `'FILL' 1, 'wght' 600, 'opsz' ${props.size || 20}`,
			}}
		>
			{props.name}
		</span>
	)
}
