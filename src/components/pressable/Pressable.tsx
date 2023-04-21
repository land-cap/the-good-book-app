import {
  ComponentWithAs,
  polymorphicFactory,
} from "@polymorphic-factory/solid";
import {
  PressableProps,
  usePressable,
} from "~/components/pressable/usePressable";
import { Component, JSX } from "solid-js";

type DOMElements = keyof JSX.IntrinsicElements;

type ElementType = DOMElements | Component<any>;

const PolyButton = polymorphicFactory().button;

export const Pressable = <T extends ElementType>({
  as,
  children,
  setApi,
  context,
  variant,
  size,
  ...props
}: PressableProps & {
  as?: Parameters<ComponentWithAs<T>>[0]["as"];
  setApi?: (api: any) => void;
  children: JSX.Element;
} & Parameters<ComponentWithAs<T>>[0]) => {
  const { classList, api } = usePressable({ context, variant, size });

  setApi?.(api);

  return (
    <PolyButton as={as} class={classList} {...api().pressableProps} {...props}>
      {children}
    </PolyButton>
  );
};
