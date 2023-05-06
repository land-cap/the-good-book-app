export const fontSizeToCapHeight: Record<string, { capHeight: number; lineGap: number }> = {
	xs: { capHeight: 8, lineGap: 8 },
	sm: { capHeight: 9, lineGap: 9 },
	base: { capHeight: 10, lineGap: 10 },
	lg: { capHeight: 12, lineGap: 12 },
	xl: { capHeight: 14, lineGap: 14 },
	'2xl': { capHeight: 18, lineGap: 18 },
	'3xl': { capHeight: 22, lineGap: 22 },
	'4xl': { capHeight: 26, lineGap: 26 },
	'5xl': { capHeight: 32, lineGap: 32 },
	'6xl': { capHeight: 40, lineGap: 40 },
	'7xl': { capHeight: 56, lineGap: 28 },
	'8xl': { capHeight: 68, lineGap: 34 },
	'9xl': { capHeight: 92, lineGap: 46 },
}

export type FontSize = keyof typeof fontSizeToCapHeight
