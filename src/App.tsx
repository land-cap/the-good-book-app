// @refresh reload
import { Route, Routes } from 'solid-start'
import './root.css'
import { AppShell } from '~/components'
import { Chapter } from '~/pages'

export const App = () => {
    return (
        <AppShell>
            <Routes>
                <Route path={'/'} component={Chapter} />
            </Routes>
        </AppShell>
    )
}
