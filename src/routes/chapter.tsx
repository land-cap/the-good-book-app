import { usePressable } from "~/components/pressable/usePressable";

export default () => {
  const button = usePressable({
    context: {
      onPress() {
        console.log("press");
      },
      onLongPress() {
        console.log("long press");
      },
    },
    variant: "black",
    size: "xl",
  });

  return <p>This is the first chapter of the Bible.</p>;
};
