import * as combobox from "@zag-js/combobox";
import { comboboxStyles } from "./combobox.styles";
type ComboboxOption = {
    label: string;
    disabled: boolean;
};
export type ComboboxApi = ReturnType<typeof combobox.connect>;
export type ComboboxProps = {
    context?: Partial<Parameters<typeof combobox.machine>[0]>;
    options: ComboboxOption[];
    defaultValue?: string;
    placeholder?: string;
    setApiRef?: (ref: ComboboxApi) => void;
    stylesOverride?: Partial<typeof comboboxStyles>;
};
export declare const Combobox: ({ context, defaultValue, placeholder, stylesOverride, setApiRef, ...props }: ComboboxProps) => import("solid-js").JSX.Element;
export declare const StyledCombobox: (props: ComboboxProps) => import("solid-js").JSX.Element;
export {};
