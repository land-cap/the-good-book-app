import { twMerge } from 'tailwind-merge'
import { Capped } from '~/cap-ui/meta/Capped'
import { ChapterPicker } from '~/components/ChapterPicker/ChapterPicker'
import { createSignal } from 'solid-js'

export const [navbarHeight, setNavbarHeight] = createSignal(0)

export const Navbar = () => (
	<nav
		ref={(navbarEl) => {
			if (navbarEl) {
				const observer = new ResizeObserver((element) => {
					element.forEach((mutation) => {
						setNavbarHeight(mutation.contentRect.height)
					})
				})

				observer.observe(navbarEl)
			}
		}}
		class={twMerge(
			'z-10 sticky top-0  mx-auto w-full max-w-2xl px-6 lg:px-8 bg-white dark:bg-black'
		)}
	>
		<div class={'border-b border-gray-200 dark:border-gray-700'}>
			<div
				class={'flex flex-col sm:flex-row gap-6 py-4 sm:py-0 sm:h-16 justify-between items-center'}
			>
				<Capped component={'p'} class="hidden sm:block font-bold">
					The Good Book
				</Capped>
				<div class="w-full sm:w-64">
					<ChapterPicker />
				</div>
			</div>
		</div>
	</nav>
)
