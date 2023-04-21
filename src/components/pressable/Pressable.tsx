import * as pressable from "@zag-js/pressable";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId } from "solid-js";
import { twMerge } from "tailwind-merge";
import { pressableClass } from "~/components/pressable/pressable-classes";

export const Pressable = () => {
  const [state, send] = useMachine(
    pressable.machine({
      id: createUniqueId(),
      onPress() {
        console.log("press");
      },
      onLongPress() {
        console.log("long press");
      },
      preventFocusOnPress: true,
    })
  );

  const api = createMemo(() => pressable.connect(state, send, normalizeProps));

  return (
    <button
      {...api().pressableProps}
      class={twMerge(
        pressableClass.base,
        pressableClass.size.xl,
        pressableClass.variant.primary
      )}
    >
      {api().isPressed ? "Pressed!" : "Press Me"}
    </button>
  );
};
