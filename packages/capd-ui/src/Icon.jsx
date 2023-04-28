import { twMerge } from 'tailwind-merge';
const sizeToClass = {
    20: 'w-5 h-5 text-[20px]',
    24: 'w-5 h-5 text-[24px]',
    40: 'w-5 h-5 text-[40px]',
    48: 'w-5 h-5 text-[48px]',
};
export const Icon = ({ name, size, className, inline, }) => {
    const sizeClass = size ? sizeToClass[size] : sizeToClass[20];
    return (<span class={twMerge('material-icon', !inline && sizeClass, className)} style={{
            'font-variation-settings': `'FILL' 1, 'wght' 600, 'opsz' ${size || 20}`,
        }}>
      {name}
    </span>);
};
