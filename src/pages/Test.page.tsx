import { Capped } from '~/components/meta/Capped'

export const Test = () => (
    <div class={'flex flex-col gap-8 place-content-center place-items-center my-16 sm:my-24'}>
        <Capped component={'p'} fontSize={'xs'}>
            This is paragraph
        </Capped>
        <Capped component={'p'} fontSize={'sm'}>
            This is paragraph
        </Capped>
        <Capped component={'p'} fontSize={'base'}>
            This is a paragraph
        </Capped>
        <Capped component={'p'} fontSize={'lg'}>
            This is paragraph
        </Capped>
        <Capped component={'p'} fontSize={'xl'}>
            This is paragraph
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