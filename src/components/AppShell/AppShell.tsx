import { JSX } from 'solid-js'
import { Navbar } from '~/components/AppShell/NavBar'
import { Footer } from '~/components/AppShell/Footer'

export const AppShell = (props: { children: JSX.Element }) => (
	<div
		class={
			'text-base flex flex-col h-fit min-h-[100vh] text-black dark:text-whiteOnDark dark:bg-gray-900'
		}
	>
		<Navbar />
		<div class="flex-grow mx-auto w-full max-w-2xl px-6 lg:px-8">{props.children}</div>
		<Footer />
	</div>
)
