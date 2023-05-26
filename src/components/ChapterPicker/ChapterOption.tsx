import { range } from 'ramda'
import { createMemo, For } from 'solid-js'

export const ChapterOptions = (props: { chapterCount: number }) => {
	const chapterList = createMemo(() => range(1, props.chapterCount).map((chapter) => chapter))

	return (
		<div class="flex flex-row flex-wrap">
			<For each={chapterList()}>{(chapter) => <ChapterOption value={chapter} />}</For>
		</div>
	)
}

export const ChapterOption = (props: { value: number }) => (
	<button class="w-12 h-12 grid align-middle place-content-center">{props.value}</button>
)
