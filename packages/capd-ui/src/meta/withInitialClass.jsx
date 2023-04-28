import { Dynamic } from 'solid-js/web';
import { twMerge } from 'tailwind-merge';
export const withInitialClass = (defaultClasses, Component) => {
    return (props) => {
        return (
        // @ts-ignore
        <Dynamic component={Component} {...props} class={twMerge(defaultClasses, props.class)}/>);
    };
};
