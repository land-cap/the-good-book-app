import { JSX } from 'solid-js'
import { NavBar } from '~/components/AppShell/NavBar'
import { Icon } from '~/components/composable/Icon'
import { Capped } from '~/cap-ui/meta/Capped'

export const AppShell = (props: { children: JSX.Element }) => (
	<div
		class={
			'text-base flex flex-col h-fit min-h-[100vh] text-black dark:text-whiteOnDark dark:bg-gray-900'
		}
	>
		<NavBar />
		<div class="flex-grow mx-auto w-full max-w-3xl px-6 lg:px-8">{props.children}</div>
		<footer class="flex place-content-center my-24 sm:my-32">
			<Capped component={'p'} fontSize={'xs'} class="text-gray-500">
				<span class="inline-flex items-center">
					Made with{' '}
					{
						<Capped
							component={Icon}
							fontSize={'lg'}
							name="favorite"
							inline
							class="mx-1 text-base"
						/>
					}{' '}
					in Moldova by
				</span>{' '}
				<a href={'https://github.com/land-cap'} target={'_blank'} class="font-bold">
					&commat;land-cap
				</a>
			</Capped>
		</footer>
	</div>
)
