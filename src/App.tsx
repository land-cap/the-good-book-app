import './root.css'
import { Chapter } from '~/pages'
import { Navigate, Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Test } from '~/pages/Test.page'
import { NotFound } from '~/pages/NotFound.page'
import { Head } from '~/Head'
import { createSignal, onMount } from 'solid-js'

export const [isBrowserUi, setIsBrowserUi] = createSignal(true)

export const App = () => {
	onMount(() => {
		window.addEventListener('DOMContentLoaded', () => {
			if (window.matchMedia('(display-mode: standalone)').matches) {
				setIsBrowserUi(false)
			}
		})
	})

	return (
		<AppShell>
			<Head />
			<Routes>
				<Route path={'/'} element={<Navigate href={'/GEN/1'} />} />
				<Route path={'/test'} component={Test} />
				<Route path={'/:bookCode/:chapter'} component={Chapter} />
				<Route path={'*'} component={NotFound} />
			</Routes>
		</AppShell>
	)
}
