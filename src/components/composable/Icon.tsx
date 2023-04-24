import { twMerge } from 'tailwind-merge'

type IconSize = 20 | 24 | 40 | 48

const sizeClass: Record<number, string> = {
    20: 'w-5 h-5 text-[20px]',
    24: 'w-5 h-5 text-[24px]',
    40: 'w-5 h-5 text-[40px]',
    48: 'w-5 h-5 text-[48px]',
}

export const Icon = (props: { name: string; size?: IconSize; class?: string }) => (
    <span
        class={twMerge('material-symbols-sharp', props.size ? sizeClass[props.size] : sizeClass[20], props.class)}
        style={{
            'font-variation-settings': `'FILL' 1, 'wght' 600, 'opsz' ${props.size || 20}`,
        }}
    >
        {props.name}
    </span>
)
