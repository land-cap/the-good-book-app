import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { Combobox } from '~/components'

const [isScrolled, setIsScrolled] = createSignal(false)

const transitionClass = 'transition-none ease-in duration-400'

const InteractiveNavbar = () => {
    const [height, setHeight] = createSignal(0)

    const defaultMaxHeight = createMemo(() => (height() ? `${height()}px` : 'unset'))

    return (
        <div
            ref={(el) => setHeight(el.clientHeight)}
            style={{ 'max-height': isScrolled() ? '0px' : defaultMaxHeight() }}
            class={twMerge(transitionClass, isScrolled() && 'opacity-0')}
        >
            <div
                class={twMerge(
                    'flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center'
                )}
            >
                <div class="flex flex-shrink-0 items-center">
                    <p class="text-md font-black">The Good Book</p>
                </div>
                <Combobox
                    options={[
                        { label: 'Geneza', disabled: false },
                        { label: 'Exod', disabled: false },
                        { label: 'Leviticul', disabled: false },
                        { label: 'Judecători', disabled: false },
                    ]}
                    defaultValue={'Geneza'}
                />
            </div>
        </div>
    )
}

const ScrolledNavbar = () => {
    const [ref, setRef] = createSignal(null as unknown as HTMLDivElement)

    const [height, setHeight] = createSignal(0)

    createEffect(() => {
        if (isScrolled() && !height()) {
            setHeight(ref().clientHeight)
        }
    })

    const defaultMaxHeight = createMemo(() => (height() ? `${height()}px` : 'unset'))

    return (
        <div
            ref={(el) => setRef(el)}
            style={{ 'max-height': !isScrolled() ? '0px' : defaultMaxHeight() }}
            class={twMerge(transitionClass, !isScrolled() && 'opacity-0')}
        >
            <div class={twMerge('flex place-content-center py-2')}>
                <p class="text-sm text-gray-500 font-black">Geneza 1</p>
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
        <nav
            class={twMerge(
                'z-10 sticky top-0 bg-offWhite dark:bg-gray-800 mx-auto w-full max-w-3xl px-6 lg:px-8',
                transitionClass
            )}
        >
            <div
                class={twMerge(
                    'border-b border-black dark:border-b-whiteOnDark',
                    transitionClass,
                    isScrolled() && 'border-gray-200'
                )}
            >
                <InteractiveNavbar />
                <ScrolledNavbar />
            </div>
        </nav>
    )
}
