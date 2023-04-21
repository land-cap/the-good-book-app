import { usePressable } from "~/components/pressable/usePressable";

export default function Home() {
  const button = usePressable(
    {
      onPress() {
        console.log("press");
      },
      onLongPress() {
        console.log("long press");
      },
      preventFocusOnPress: true,
    },
    "soft",
    "xs"
  );

  return (
    <main class="text-center mx-auto">
      <button class={button.classList}>
        {button.api().isPressed ? "Pressed!" : "Press Me"}
      </button>
    </main>
  );
}
