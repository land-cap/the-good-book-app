import { ChapterPicker } from '~/components/ChapterPicker'
import { createSignal, onMount } from 'solid-js'

const InteractiveNavbar = () => (
    <div class="flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center">
        <div class="flex flex-shrink-0 items-center">
            <p class="text-md font-black">The Good Book</p>
        </div>
        <ChapterPicker value={'Geneza 1'} />
    </div>
)

const ScrolledNavbar = () => (
    <div class="flex place-content-center py-2">
        <p class="font-black">Geneza 1</p>
    </div>
)

const [scrollPos, setScrollPos] = createSignal(false)

export const NavBar = () => {
    onMount(() => {
        window.addEventListener('scroll', (e) => {
            const scrollY = window.scrollY
            console.log(scrollY)
            if (!!scrollY !== scrollPos()) {
                setScrollPos(!!scrollY)
            }
        })
    })

    return (
        <nav class={'z-20 sticky top-0 bg-offWhite mx-auto w-full max-w-2xl px-6 lg:px-8'}>
            <div class="border-b border-black">{scrollPos() ? <ScrolledNavbar /> : <InteractiveNavbar />}</div>
        </nav>
    )
}
