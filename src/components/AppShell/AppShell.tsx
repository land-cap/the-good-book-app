import { JSX } from 'solid-js'
import { NavBar } from '~/components/AppShell/NavBar'
import { Icon } from '~/components/composable/Icon'

export const AppShell = ({ children }: { children: JSX.Element }) => (
    <div class={'flex flex-col h-fit min-h-fit text-black bg-offWhite dark:text-whiteOnDark dark:bg-gray-800'}>
        <NavBar />
        <div class="flex-grow mx-auto w-full max-w-3xl px-6 lg:px-8">{children}</div>
        <footer class="flex place-content-center my-20 sm:my-32 text-sm text-gray-500">
            <p>
                <span class="">&copy; landCap</span> |&#32;
                <span class="inline-flex">
                    made with {<Icon name={'favorite'} size={20} class="mx-1 text-red-500" />} in Moldova
                </span>
            </p>
        </footer>
    </div>
)
