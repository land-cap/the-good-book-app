import { Capped } from '~/cap-ui'
import { Icon } from '~/components/composable/Icon'

export function Footer() {
	return (
		<footer class="flex place-content-center mx-auto w-full max-w-2xl px-6 lg:px-8 my-20 sm:my-32">
			<div class="flex flex-col gap-6 items-center text-center">
				<Capped component={'p'} fontSize={'xs'} class="text-gray-500">
					© Drepturi de autor British and Foreign Bible Society (BFBS) și Societatea Biblică
					Interconfesională din România (SBIR) 1924,&nbsp;2014
					<br />© copyright British and Foreign Bible Society and the Interconfessional Bible
					Society of Romania 1924,&nbsp;2014
				</Capped>
				<Capped component={'p'} fontSize={'xs'} class="text-gray-500">
					<span class="inline-flex items-center">
						Made with{' '}
						{<Capped component={Icon} fontSize={'xs'} name="favorite" inline class="mx-1" />} in
						Moldova by
					</span>{' '}
					<a href={'https://github.com/land-cap'} target={'_blank'} class="font-bold">
						&commat;land-cap
					</a>
				</Capped>
			</div>
		</footer>
	)
}
