import './root.css'
import { Chapter } from '~/pages'
import { Route, RouteDataFuncArgs, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Test } from '~/pages/Test.page'
import { NotFound } from '~/pages/NotFound.page'
import { Head } from '~/Head'

const chapterData = ({ params, location, navigate, data }: RouteDataFuncArgs) => params

export const App = () => (
	<AppShell>
		<Head />
		<Routes>
			<Route path={'/test'} component={Test} />
			<Route path={'/:bookCode/:chapter'} component={Chapter} data={chapterData} />
			<Route path={'*'} component={NotFound} />
		</Routes>
	</AppShell>
)
