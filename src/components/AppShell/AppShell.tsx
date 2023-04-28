import { JSX } from 'solid-js'
import { NavBar } from '~/components/AppShell/NavBar'
import { Icon } from '~/components/composable/Icon'
import { Capped } from '~/cap-ui/meta/Capped'

export const AppShell = ({ children }: { children: JSX.Element }) => (
  <div
    class={
      'text-base flex flex-col h-fit min-h-[100vh] text-black dark:text-whiteOnDark dark:bg-gray-900'
    }
  >
    <NavBar />
    <div class="flex-grow mx-auto w-full max-w-3xl px-6 lg:px-8">{children}</div>
    <footer class="flex place-content-center my-24 sm:my-32">
      <Capped component={'p'} fontSize={'xs'} class="text-gray-500">
        <span class="inline-flex items-center">
          Made with{' '}
          {
            <Capped
              component={Icon}
              fontSize={'sm'}
              name="favorite"
              inline
              className="mx-1 text-accent-600 dark:text-accent-500"
            />
          }{' '}
          in Moldova by
        </span>{' '}
        <a href={'https://github.com/dalandcap'} target={'_blank'} class="font-bold">
          &commat;landCap
        </a>
      </Capped>
    </footer>
  </div>
)
