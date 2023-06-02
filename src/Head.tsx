import { Link, Meta } from '@solidjs/meta'
import colors from 'tailwindcss/colors'

const lightColor = colors.white

const darkColor = colors.neutral[900]

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const Head = () => (
	<>
		<Meta name="theme-color" content={isDarkMode ? darkColor : lightColor} />
		<Link rel="manifest" href="/manifest.json" />
		<Meta
			name="viewport"
			content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no, shrink-to-fit=no"
		/>
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
			href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
			rel="stylesheet"
		/>
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,YTAS,YTFI,YTLC,YTUC@8..144,25,400,0,750,788,570,760;8..144,25,900,150,854,788,570,760&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=Ysabeau:ital,wght@0,1;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,1;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
		{/*<link*/}
		{/*	href="https://fonts.googleapis.com/css2?family=Poltawski+Nowy:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"*/}
		{/*	rel="stylesheet"*/}
		{/*/>*/}
	</>
)
