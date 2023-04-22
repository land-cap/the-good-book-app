import { ChapterPicker } from '~/components/ChapterPicker'
import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { twMerge } from 'tailwind-merge'

const [isScrolled, setIsScrolled] = createSignal(false)

const transitionClass = 'transition-all duration-200'

const InteractiveNavbar = () => {
    const [height, setHeight] = createSignal(0)

    const defaultMaxHeight = createMemo(() => (height() ? `${height()}px` : 'unset'))

    return (
        <div
            ref={(el) => setHeight(el.clientHeight)}
            style={{ 'max-height': isScrolled() ? '0px' : defaultMaxHeight() }}
            class={twMerge('overflow-hidden', transitionClass)}
        >
            <div
                class={twMerge(
                    'flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center'
                )}
            >
                <div class="flex flex-shrink-0 items-center">
                    <p class="text-md font-black">The Good Book</p>
                </div>
                <ChapterPicker value={'Geneza 1'} />
            </div>
        </div>
    )
}

const ScrolledNavbar = () => {
    const [height, setHeight] = createSignal(0)

    createEffect(() => height)

    const defaultMaxHeight = createMemo(() => (height() ? `${height()}px` : 'unset'))

    return (
        <div
            ref={(el) => setHeight(el.clientHeight)}
            style={{ 'max-height': !isScrolled() ? '0px' : defaultMaxHeight() }}
            class={twMerge('overflow-hidden', transitionClass)}
        >
            <div class={twMerge('flex place-content-center py-2')}>
                <p class="font-black">Geneza 1</p>
            </div>
        </div>
    )
}

export const NavBar = () => {
    onMount(() => {
        window.addEventListener('scroll', (e) => {
            const scrollY = window.scrollY
            if (!!scrollY !== isScrolled()) {
                setIsScrolled(!!scrollY)
            }
        })
    })

    return (
        <nav class={twMerge('z-20 sticky top-0 bg-offWhite mx-auto w-full max-w-2xl px-6 lg:px-8', transitionClass)}>
            <div class={twMerge('border-b border-black', transitionClass)}>
                <ScrolledNavbar />
                <InteractiveNavbar />
            </div>
        </nav>
    )
}
