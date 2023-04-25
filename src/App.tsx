// @refresh reload
import './root.css'
import { Chapter } from '~/pages'
import { Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'

export const App = () => {
    return (
        <AppShell>
            <Routes>
                <Route path={'/'} component={Chapter} />
            </Routes>
        </AppShell>
    )
}
