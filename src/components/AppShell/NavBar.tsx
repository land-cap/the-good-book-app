import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { Portal } from 'solid-js/web'
import { Capped } from '~/cap-ui/meta/Capped'
import { A } from '@solidjs/router'
import { bookList } from '~/state/books.state'
import { bookCode, chapterTitle } from '~/pages'
import { range } from 'ramda'
import { ChapterPicker } from '~/components/ChapterPicker/ChapterPicker'

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
	const bookOptionList = createMemo(() =>
		bookList().map((book) => ({ value: book, label: book.name, disabled: false }))
	)

	const initialOption = createMemo(() => {
		const bookId = bookList().find((book) => book.code === bookCode())?.id
		return bookOptionList().find(({ value: { id } }) => id === bookId)
	})

	createEffect(() => {
		if (interactiveNavbarEl()) {
			intersectionObserver.observe(interactiveNavbarEl())
		}
	})

	onCleanup(() => {
		intersectionObserver.unobserve(interactiveNavbarEl())
	})

	const [selectedBookChapterCount, _setSelectedBookChapterCount] = createSignal(
		null as unknown as number
	)

	const setSelectedBookChapterCount = (() => {
		let calledOnce = false
		return (chapterCount: number) => {
			if (calledOnce) _setSelectedBookChapterCount(chapterCount)
			calledOnce = true
		}
	})()

	const chapterOptionList = createMemo(() =>
		selectedBookChapterCount()
			? range(1, selectedBookChapterCount()).map((chapter) => ({
					value: chapter,
					label: chapter.toString(),
					disabled: false,
			  }))
			: null
	)

	createEffect(() => console.log(chapterOptionList()))

	return (
		<nav
			ref={(el) => setInteractiveNavbar(el)}
			class={twMerge('dark:bg-gray-900 mx-auto w-full max-w-3xl px-6 lg:px-8')}
		>
			<div class={'border-b border-gray-200 dark:border-gray-700'}>
				<div
					class={
						'flex flex-col sm:flex-row gap-6 pt-6 pb-4 sm:py-0 sm:h-16 justify-between items-center'
					}
				>
					<A href="/" class="flex flex-shrink-0 items-center -my-4 py-4">
						<Capped component={'p'} class="font-bold">
							The Good Book
						</Capped>
					</A>
					<div class="w-full sm:w-48">
						<ChapterPicker
							context={{
								onSelect: ({ value }) => {
									const chapterCount = bookList().find(({ name }) => name === value)?.chapter_count
									if (chapterCount) setSelectedBookChapterCount(chapterCount)
								},
							}}
							optionList={bookOptionList()}
							initialOption={initialOption()}
						/>
					</div>
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
			<div class={'border-b border-gray-200 dark:border-gray-700'}>
				<div class={twMerge('flex place-content-center py-2')}>
					<p class="text-sm text-gray-500 font-bold">{chapterTitle()}</p>
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
