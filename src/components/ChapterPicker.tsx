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
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 text-primary-600">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                    />
                </svg>
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
                    class="w-full border-0 bg-offWhite dark:bg-gray-800 py-1.5 pl-3 pr-12 shadow-sm ring-2 ring-inset ring-black dark:ring-whiteOnDark focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    role="combobox"
                    aria-controls="options"
                    aria-expanded="false"
                />
                <button type="button" class="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none">
                    <svg
                        class="h-5 w-5 text-black dark:text-whiteOnDark"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <ShadowChapterMenu setMenu={setShadowMenu} />
                <Portal>
                    <VisibleChapterMenu setMenu={setVisibleMenu} />
                </Portal>
            </div>
        </div>
    )
}
