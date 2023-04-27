// @refresh reload
import './root.css'
import { Chapter } from '~/pages'
import { Route, Routes } from '@solidjs/router'
import { AppShell } from '~/components'
import { Link, Meta } from '@solidjs/meta'
import colors from 'tailwindcss/colors'
import { Test } from '~/pages/Test.page'
import { NotFound } from '~/pages/NotFound.page'

let lightColor = colors.stone[50]

const darkColor = colors.stone[800]

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const App = () => (
    <AppShell>
        <Meta name="theme-color" content={isDarkMode ? darkColor : lightColor} />
        <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
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
        {/*<link*/}
        {/*    href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900;8..144,1000&display=swap"*/}
        {/*    rel="stylesheet"*/}
        {/*/>*/}
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,YTAS,YTFI,YTLC,YTUC@8..144,25,400,0,750,788,570,760;8..144,25,900,150,854,788,570,760&display=swap"
            rel="stylesheet"
        />
        <Routes>
            <Route path={'/'} component={Chapter} />
            <Route path={'/test'} component={Test} />
            <Route path={'*'} component={NotFound} />
        </Routes>
    </AppShell>
)
