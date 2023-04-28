import { twMerge } from 'tailwind-merge';
import { transitionQuick } from '../transitions.styles';
export const comboboxStyles = {
    container: 'z-10 relative',
    input: twMerge('w-full rounded-md border-0 bg-white dark:bg-gray-900 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500 sm:text-sm sm:leading-6', transitionQuick),
    inputButton: twMerge('absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none text-gray-400 dark:text-gray-500 hover:text-primary-500', transitionQuick),
    optionContainer: 'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
    option: twMerge('relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900'),
    option_focused: 'bg-primary-600 text-white',
    option_checked: 'font-semibold',
    optionLabel: 'block truncate',
    optionIcon: twMerge('absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600'),
    optionIcon_focused: 'text-white',
};
