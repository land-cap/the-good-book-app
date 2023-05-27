import { range } from 'ramda'
import { createMemo, For } from 'solid-js'

export const ChapterOptions = (props: { chapterCount: number }) => {
	const chapterList = createMemo(() => range(1, props.chapterCount).map((chapter) => chapter))

	return (
		<div class="grid grid-cols-5 gap-1 bg-accent-100 border-[0.25rem] border-accent-100">
			<For each={chapterList()}>{(chapter) => <ChapterOption value={chapter} />}</For>
		</div>
	)
}

export const ChapterOption = (props: { value: number }) => (
	<button class="grid aspect-square align-middle place-content-center bg-white hover:bg-accent-600 text-black hover:text-white">
		{props.value}
	</button>
)
