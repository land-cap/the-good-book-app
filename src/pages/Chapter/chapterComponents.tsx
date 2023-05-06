import { Capped } from '~/cap-ui'

export const ChapterTitle = ({ children }: { children: any }) => (
	<Capped component="h1" class="font-bold tracking-tight" fontSize={'4xl'}>
		{children}
	</Capped>
)
