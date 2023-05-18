import { Capped } from '~/cap-ui/meta/Capped'
import { createSignal } from 'solid-js'
import { CapUiLogo } from '~/cap-ui/CapUiLogo'
import { Pressable } from '~/cap-ui'

const [toggle, setToggle] = createSignal(true)

export const Test = () => (
	<div class={'flex flex-col gap-8 place-contentItem-center place-items-center my-16 sm:my-24'}>
		<CapUiLogo />
		<Pressable>this is a button</Pressable>
		<Pressable variant="secondary">this is a button</Pressable>
		<Pressable variant="soft">this is a button</Pressable>
		<Pressable variant="black">this is a button</Pressable>
		<Pressable variant="outline">this is a button</Pressable>
		<Capped component={'p'} fontSize={'xs'}>
			This is paragraph
		</Capped>
		<Capped component={'p'} fontSize={'sm'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'base'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'lg'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'2xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'3xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'4xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'5xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'6xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'7xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'8xl'}>
			This is a paragraph
		</Capped>
		<Capped component={'p'} fontSize={'9xl'}>
			This is a paragraph
		</Capped>
	</div>
)
