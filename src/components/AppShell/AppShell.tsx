import {JSX} from 'solid-js'
import {NavBar} from '~/components/AppShell/NavBar'

export const AppShell = ({children}: { children: JSX.Element }) => (
    <div
        class={'flex flex-col h-fit min-h-fit text-black bg-offWhite dark:text-whiteOnDark dark:bg-gray-800'}
    >
        <NavBar/>
        <div class="flex-grow mx-auto w-full max-w-2xl px-6 lg:px-8">
            {children}
        </div>
    </div>
)
