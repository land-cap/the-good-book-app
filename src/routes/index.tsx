import { usePressable } from '~/components'

export default () => {
    const button = usePressable({
        context: {
            onPress() {
                console.log('press')
            },
            onLongPress() {
                console.log('long press')
            },
        },
        variant: 'black',
        size: 'xl',
    })

    return (
        <main class="flex h-[100vh] items-center justify-center gap-4">
            <a {...button.api().pressableProps} class={button.classList}>
                {button.api().isPressed ? 'Pressed!' : 'Press Me'}
            </a>
        </main>
    )
}
