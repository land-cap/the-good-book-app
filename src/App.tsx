import './root.css'
import { Chapter } from '~/pages'
import { Navigate, Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Test } from '~/pages/Test.page'
import { NotFound } from '~/pages/NotFound.page'
import { Head } from '~/Head'

export const App = () => (
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
