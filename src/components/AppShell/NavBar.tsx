import { createEffect, createSignal, onCleanup } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { Portal } from 'solid-js/web'
import { Capped } from '~/cap-ui/meta/Capped'
import { A } from '@solidjs/router'
import { StyledCombobox } from '~/cap-ui/Combobox/Combobox'

const [isInteractiveNavbarVisible, setIsInteractiveNavbarVisible] = createSignal(true)

const [interactiveNavbarEl, setInteractiveNavbar] = createSignal(null as unknown as HTMLElement)

const intersectionObserver = new IntersectionObserver(
    (entries) => {
        const isIntersecting = entries[0].isIntersecting
        setIsInteractiveNavbarVisible(isIntersecting)
    },
    { threshold: 0 }
)

const InteractiveNavbar = () => {
    createEffect(() => {
        if (interactiveNavbarEl()) {
            intersectionObserver.observe(interactiveNavbarEl())
        }
    })

    onCleanup(() => {
        intersectionObserver.unobserve(interactiveNavbarEl())
    })

    return (
        <nav
            ref={(el) => setInteractiveNavbar(el)}
            class={twMerge('dark:bg-gray-900 mx-auto w-full max-w-3xl px-6 lg:px-8')}
        >
            <div class={'border-b border-black dark:border-b-whiteOnDark'}>
                <div class={'flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center'}>
                    <A href="/" class="flex flex-shrink-0 items-center -my-4 py-4">
                        <Capped component={'p'} class="font-black">
                            The Good Book
                        </Capped>
                    </A>
                    <StyledCombobox
                        options={[
                            { label: 'Geneza', disabled: false },
                            { label: 'Exod', disabled: false },
                            { label: 'Leviticul', disabled: false },
                            { label: 'Judecători', disabled: false },
                            { label: 'Geneza1', disabled: false },
                            { label: 'Exod1', disabled: false },
                            { label: 'Leviticul1', disabled: false },
                            { label: 'Judecători1', disabled: false },
                            { label: 'Geneza2', disabled: false },
                            { label: 'Exod2', disabled: false },
                            { label: 'Leviticul2', disabled: false },
                            { label: 'Judecători2', disabled: false },
                            { label: 'Geneza3', disabled: false },
                            { label: 'Exod3', disabled: false },
                            { label: 'Leviticul3', disabled: false },
                            { label: 'Judecători3', disabled: false },
                            { label: 'Geneza4', disabled: false },
                            { label: 'Exod4', disabled: false },
                            { label: 'Leviticul4', disabled: false },
                            { label: 'Judecători4', disabled: false },
                            { label: 'Geneza5', disabled: false },
                            { label: 'Exod5', disabled: false },
                            { label: 'Leviticul5', disabled: false },
                            { label: 'Judecători5', disabled: false },
                            { label: 'Geneza6', disabled: false },
                            { label: 'Exod6', disabled: false },
                            { label: 'Leviticul6', disabled: false },
                            { label: 'Judecători6', disabled: false },
                            { label: 'Geneza7', disabled: false },
                            { label: 'Exod7', disabled: false },
                            { label: 'Leviticul7', disabled: false },
                            { label: 'Judecători7', disabled: false },
                            { label: 'Geneza8', disabled: false },
                            { label: 'Exod8', disabled: false },
                            { label: 'Leviticul8', disabled: false },
                            { label: 'Judecători8', disabled: false },
                        ]}
                        defaultValue={'Geneza'}
                    />
                </div>
            </div>
        </nav>
    )
}

const ScrolledNavbar = () => {
    return (
        <nav
            class={twMerge(
                'z-10 fixed top-0 left-1/2 -translate-x-1/2 max-w-3xl bg-white dark:bg-gray-900 mx-auto w-full px-6 lg:px-8 transition-transform',
                !isInteractiveNavbarVisible()
                    ? 'translate-y-0 ease-emphasized-decelerate duration-emphasized-decelerate'
                    : '-translate-y-full ease-emphasized-accelerate duration-emphasized-accelerate'
            )}
        >
            <div class={'border-b border-gray-200 dark:border-b-gray-700'}>
                <div class={twMerge('flex place-content-center py-2')}>
                    <p class="text-sm text-gray-500 font-black">Geneza 1</p>
                </div>
            </div>
        </nav>
    )
}

export const NavBar = () => {
    return (
        <>
            <Portal>
                <ScrolledNavbar />
            </Portal>
            <InteractiveNavbar />
        </>
    )
}
