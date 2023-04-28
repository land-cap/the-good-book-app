import { ValidComponent } from 'solid-js';
import { DynamicProps } from 'solid-js/web';
export declare const withInitialClass: <T extends ValidComponent>(defaultClasses: string, Component: T) => (props: Omit<DynamicProps<T, import("solid-js").ComponentProps<T>>, "component">) => import("solid-js").JSX.Element;
