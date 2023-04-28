import { normalizeProps, useMachine } from '@zag-js/solid';
import * as pressable from '@zag-js/pressable';
import { Dynamic } from 'solid-js/web';
import { createMemo, createUniqueId, onMount } from 'solid-js';
import { twMerge } from 'tailwind-merge';
import { pressableStyles } from './pressable.styles';
export const Pressable = ({ context, variant, size, component, ...props }) => {
    const [state, send] = useMachine(pressable.machine({
        id: createUniqueId(),
        preventFocusOnPress: true,
        ...context,
    }));
    const classList = twMerge(pressableStyles.base, variant ? pressableStyles.variant[variant] : pressableStyles.variant.primary, size ? pressableStyles.size[size] : pressableStyles.size.md);
    const api = createMemo(() => pressable.connect(state, send, normalizeProps));
    onMount(() => {
        if (props.setApiRef) {
            props.setApiRef(api());
        }
    });
    return (<Dynamic component={component || 'button'} {...api().pressableProps} {...props} class={twMerge(classList, props.class)}/>);
};
