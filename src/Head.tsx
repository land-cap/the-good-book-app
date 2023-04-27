import { Link, Meta } from '@solidjs/meta'
import colors from 'tailwindcss/colors'

let lightColor = colors.white

const darkColor = colors.neutral[900]

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const Head = () => (
    <>
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
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,YTAS,YTFI,YTLC,YTUC@8..144,25,400,0,750,788,570,760;8..144,25,900,150,854,788,570,760&display=swap"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,350,100;9..144,900,100&display=swap"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Ysabeau:ital,wght@0,1;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,1;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap"
            rel="stylesheet"
        />
    </>
)
