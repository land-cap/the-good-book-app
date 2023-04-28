import './root.css'
import { Chapter, NotFound, Test } from '~/pages'
import { Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Head } from '~/Head'

export const App = () => (
  <AppShell>
    <Head />
    <Routes>
      <Route path={'/'} component={Chapter} />
      <Route path={'/test'} component={Test} />
      <Route path={'*'} component={NotFound} />
    </Routes>
  </AppShell>
)
