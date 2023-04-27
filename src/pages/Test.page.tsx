import { Capped } from '~/cap-ui/meta/Capped'
import { Motion, Presence } from '@motionone/solid'
import { createSignal, Show } from 'solid-js'

const [toggle, setToggle] = createSignal(true)

export const Test = () => (
    <div class={'flex flex-col gap-8 place-content-center place-items-center my-16 sm:my-24'}>
        <div>
            <Presence exitBeforeEnter>
                <Show when={toggle()}>
                    <Motion.div
                        style={{ 'transform-origin': 'right', background: 'red', height: '400px' }}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6, x: -50 }}
                        transition={{ duration: 1 }}
                    ></Motion.div>
                </Show>
            </Presence>
            <button onClick={() => setToggle(!toggle())}>Toggle</button>
        </div>
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
