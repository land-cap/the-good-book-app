import * as pressable from "@zag-js/pressable"
import {normalizeProps, useMachine} from "@zag-js/solid"
import {createMemo, createUniqueId} from "solid-js"

export const Pressable = () => {
    const [state, send] = useMachine(
        pressable.machine({
            id: createUniqueId(),
            onPress() {
                console.log("press")
            },
            onLongPress() {
                console.log("long press")
            },
            preventFocusOnPress: true
        }),
    )

    const api = createMemo(() => pressable.connect(state, send, normalizeProps))

    return (
        <button {...api().pressableProps}
                class="bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {api().isPressed ? "Pressed!" : "Press Me"}
        </button>
    )
}