import {
  PressableProps,
  usePressable,
} from "~/components/pressable/usePressable";
import { Pressable } from "~/components/pressable/Pressable";

export default function Home() {
  const buttonProps: PressableProps = {
    context: {
      onPress() {
        console.log("press");
      },
      onLongPress() {
        console.log("long press");
      },
      preventFocusOnPress: true,
    },
    variant: "primary",
    size: "xl",
  };

  const button = usePressable(buttonProps);

  return (
    <main class="text-center mx-auto">
      <button class={button.classList}>
        {button.api().isPressed ? "Pressed!" : "Press Me"}
      </button>

      <Pressable {...buttonProps} as={"a"} href={4}>
        Click me please...
      </Pressable>
    </main>
  );
}
