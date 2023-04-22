import { JSX } from 'solid-js'
import { NavBar } from '~/components/AppShell/NavBar'

export const AppShell = ({ children }: { children: JSX.Element }) => (
    <div class={'min-h-full text-black bg-offWhite'}>
        <NavBar />
        <main>
            <div class="mx-auto max-w-2xl px-6 lg:px-8">{children}</div>
        </main>
    </div>
)
