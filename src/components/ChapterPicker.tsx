import { Portal } from 'solid-js/web'
import { createEffect, createSignal, onMount, Setter } from 'solid-js'
import { twMerge } from 'tailwind-merge'

const ChapterMenu = (props: { setRef: Setter<HTMLUListElement>; class?: string }) => (
    <ul
        ref={(el) => {
            props.setRef && props.setRef(el)
        }}
        class={twMerge(
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base ring-inset ring-1 ring-black dark:ring-whiteOnDark focus:outline-none sm:text-sm',
            props.class
        )}
        id="options"
        role="listbox"
    >
        <li
            class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
            id="option-0"
            role="option"
            tabIndex="-1"
        >
            <span class="block truncate">Leslie Alexander</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 text-primary-500">
                <span
                    class="w-5 h-5 material-symbols-sharp text-[20px]"
                    style={{ 'font-variation-settings': "'FILL' 1, 'wght' 600, 'opsz' 20" }}
                >
                    check
                </span>
            </span>
        </li>
    </ul>
)

const ShadowChapterMenu = (props: { setMenu: Setter<HTMLUListElement> }) => {
    return <ChapterMenu setRef={props.setMenu} class="invisible" />
}

const VisibleChapterMenu = (props: { setMenu: Setter<HTMLUListElement> }) => {
    return <ChapterMenu setRef={props.setMenu} />
}

export const ChapterPicker = ({ value }: { value: string }) => {
    const [shadowMenu, setShadowMenu] = createSignal(null as unknown as HTMLUListElement)

    const [visibleMenu, setVisibleMenu] = createSignal(null as unknown as HTMLUListElement)

    const setMenuPosition = () => {
        if (shadowMenu() && visibleMenu()) {
            visibleMenu().style.position = 'fixed'
            visibleMenu().style.marginTop = '0px'
            visibleMenu().style.top = `${shadowMenu().getBoundingClientRect().top}px`
            visibleMenu().style.left = `${shadowMenu().getBoundingClientRect().left}px`
            visibleMenu().style.width = `${shadowMenu().getBoundingClientRect().width}px`
        }
    }

    onMount(() => {
        window.onresize = () => {
            setMenuPosition()
        }
    })

    createEffect(() => {
        setMenuPosition()
    })

    return (
        <div class={'w-full sm:w-48'}>
            <div class="relative">
                <input
                    value={value}
                    id="combobox"
                    type="text"
                    class="w-full border-0 bg-offWhite dark:bg-gray-800 py-1.5 pl-3 pr-12 shadow-sm ring-2 ring-inset ring-black dark:ring-whiteOnDark focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                    role="combobox"
                    aria-controls="options"
                    aria-expanded="false"
                />
                <button type="button" class="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
                    <span
                        class="material-symbols-sharp text-[20px] h-5 w-5 text-black dark:text-whiteOnDark"
                        style={{ 'font-variation-settings': "'FILL' 1, 'wght' 600, 'opsz' 20" }}
                    >
                        unfold_more
                    </span>
                </button>
                <ShadowChapterMenu setMenu={setShadowMenu} />
                <Portal>
                    <VisibleChapterMenu setMenu={setVisibleMenu} />
                </Portal>
            </div>
        </div>
    )
}
