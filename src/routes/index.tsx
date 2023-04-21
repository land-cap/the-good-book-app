import {
  PressableProps,
  usePressable,
} from "~/components/pressable/usePressable";
import { Pressable } from "~/components/pressable/Pressable";
import { createEffect, createSignal } from "solid-js";

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
    variant: "black",
    size: "xl",
  };

  const button = usePressable(buttonProps);

  const [linkApi, setLinkApi] = createSignal<any>(null);

  createEffect(() => console.log(linkApi()));

  return (
    <main class="flex h-[100vh] items-center justify-center gap-4">
      <button {...button.api().pressableProps} class={button.classList}>
        {button.api().isPressed ? "Pressed!" : "Press Me"}
      </button>

      <Pressable setApi={setLinkApi} {...buttonProps} as={"a"} herf="#">
        {linkApi() && linkApi().isPressed ? "Pressed!" : "Press Me"}
      </Pressable>

      {/*<Pressable {...buttonProps} variant="outline">*/}
      {/*  {button.api().isPressed ? "Pressed!" : "Press Me"}*/}
      {/*</Pressable>*/}

      {/*<Pressable {...buttonProps} variant="primary">*/}
      {/*  {button.api().isPressed ? "Pressed!" : "Press Me"}*/}
      {/*</Pressable>*/}

      {/*<Pressable {...buttonProps} variant="secondary">*/}
      {/*  {button.api().isPressed ? "Pressed!" : "Press Me"}*/}
      {/*</Pressable>*/}

      {/*<Pressable {...buttonProps} variant="soft">*/}
      {/*  {button.api().isPressed ? "Pressed!" : "Press Me"}*/}
      {/*</Pressable>*/}
    </main>
  );
}
