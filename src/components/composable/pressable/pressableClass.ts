export const pressableClass = {
    base: 'inline-flex font-black',
    size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2 py-1 text-sm',
        md: 'px-2.5 py-1.5 text-sm',
        lg: 'px-3 py-2 text-sm',
        xl: 'px-3.5 py-2.5 text-sm',
    },
    variant: {
        primary:
            'bg-primary-500 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
        secondary: 'bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
        soft: 'bg-primary-50 text-primary-500 shadow-sm hover:bg-primary-100',
        primaryOnDark:
            'bg-primary-500 text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
        secondaryOnDark: 'bg-white/10 text-white shadow-sm hover:bg-white/20',
        black: 'bg-black text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500',
        outline: 'bg-white text-gray-900 shadow-sm ring-2 ring-inset ring-gray-900 hover:bg-gray-50',
    },
}
