// @refresh reload
import './root.css'
import { Chapter } from '~/pages'
import { Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Link, Meta } from '@solidjs/meta'
import colors from 'tailwindcss/colors'
import { Test } from '~/pages/Test.page'
import { NotFound } from '~/pages/NotFound.page'

export const App = () => (
    <AppShell>
        <Meta content={colors.neutral[50]} name="theme-color" />
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
            rel="stylesheet"
        />
        <Routes>
            <Route path={'/'} component={Chapter} />
            <Route path={'/test'} component={Test} />
            <Route path={'*'} component={NotFound} />
        </Routes>
    </AppShell>
)
