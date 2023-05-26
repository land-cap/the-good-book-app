import { range } from 'ramda'
import { createMemo, For } from 'solid-js'

export const ChapterOptions = (props: { chapterCount: number }) => {
	const chapterList = createMemo(() => range(1, props.chapterCount).map((chapter) => chapter))

	return (
		<div class="grid grid-cols-5 gap-px bg-gray-200 border-y border-gray-200">
			<For each={chapterList()}>{(chapter) => <ChapterOption value={chapter} />}</For>
		</div>
	)
}

export const ChapterOption = (props: { value: number }) => (
	<button class="grid aspect-square align-middle place-content-center bg-white text-black">
		{props.value}
	</button>
)
