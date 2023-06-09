/* @refresh reload */
import { render } from 'solid-js/web'
import { App } from './App'
import { Router } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'

document.addEventListener('touchstart', () => undefined, true)

const root = document.getElementById('root')

render(
	() => (
		<Router>
			<MetaProvider>
				<App />
			</MetaProvider>
		</Router>
	),
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	root!
)
