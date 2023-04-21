import { normalizeProps, useMachine } from "@zag-js/solid";
import * as pressable from "@zag-js/pressable";
import { createMemo, createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import { pressableClass } from "~/components/pressable/pressableClass";

export type PressableProps = {
  context?: Omit<Parameters<typeof pressable.machine>[0], "id">;
  variant?: keyof typeof pressableClass.variant;
  size?: keyof typeof pressableClass.size;
};

export const usePressable = ({
  context,
  variant,
  size,
}: PressableProps = {}) => {
  const [state, send] = useMachine(
    pressable.machine({
      id: createUniqueId(),
      ...context,
    })
  );

  const classList = twMerge(
    pressableClass.base,
    variant ? pressableClass.variant[variant] : pressableClass.variant.primary,
    size ? pressableClass.size[size] : pressableClass.size.md
  );

  const api = createMemo(() => pressable.connect(state, send, normalizeProps));

  return { classList, api };
};
