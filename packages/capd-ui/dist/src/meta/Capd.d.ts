import { DynamicProps } from 'solid-js/web';
import { JSX, ValidComponent } from 'solid-js';
import { FontSize } from '~/config/fontSize';
export type CappedComponent = <T extends ValidComponent>(props: DynamicProps<T> & {
    fontSize?: FontSize | number;
    lineGap?: number;
}) => JSX.Element;
export declare const Capd: CappedComponent;
