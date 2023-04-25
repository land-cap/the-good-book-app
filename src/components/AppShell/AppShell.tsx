import { JSX } from 'solid-js'
import { NavBar } from '~/components/AppShell/NavBar'
import { Icon } from '~/components/composable/Icon'
import { Capped } from '~/components/meta/Capped'

export const AppShell = ({ children }: { children: JSX.Element }) => (
    <div
        class={
            'text-base flex flex-col h-fit min-h-[100vh] text-black bg-offWhite dark:text-whiteOnDark dark:bg-gray-800'
        }
    >
        <NavBar />
        <div class="flex-grow mx-auto w-full max-w-3xl px-6 lg:px-8">{children}</div>
        <footer class="flex place-content-center my-16 sm:my-24">
            <Capped component={'p'} capHeight={8} class="text-gray-500">
                <span class="inline-flex items-center">
                    Made with {<Capped component={Icon} capHeight={10} name="favorite" inline class="mx-1" />} in
                    Moldova by
                </span>{' '}
                <a href={'https://github.com/dalandcap'} target={'_blank'} class="font-bold">
                    &commat;landCap
                </a>
            </Capped>
        </footer>
    </div>
)
