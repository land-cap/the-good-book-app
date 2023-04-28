import * as pressable from '@zag-js/pressable';
import { DynamicProps } from 'solid-js/web';
import { ValidComponent } from 'solid-js';
import { pressableStyles } from './pressable.styles';
export type PressableApi = ReturnType<typeof pressable.connect>;
export type PressableProps = {
    context?: Partial<Parameters<typeof pressable.machine>[0]>;
    variant?: keyof typeof pressableStyles.variant;
    size?: keyof typeof pressableStyles.size;
    setApiRef?: (ref: PressableApi) => void;
};
export declare const Pressable: <T extends ValidComponent>({ context, variant, size, component, ...props }: Omit<DynamicProps<T, import("solid-js").ComponentProps<T>>, "component"> & {
    component?: ValidComponent | undefined;
} & PressableProps) => import("solid-js").JSX.Element;
