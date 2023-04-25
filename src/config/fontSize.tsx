export const fontSizeToCapHeight: Record<string, { capHeight: number; lineGap: number }> = {
    xs: { capHeight: 8, lineGap: 8 },
    sm: { capHeight: 10, lineGap: 10 },
    base: { capHeight: 11, lineGap: 11 },
    lg: { capHeight: 13, lineGap: 13 },
    xl: { capHeight: 14, lineGap: 14 },
    '2xl': { capHeight: 17, lineGap: 17 },
    '3xl': { capHeight: 21, lineGap: 21 },
    '4xl': { capHeight: 26, lineGap: 26 },
    '5xl': { capHeight: 34, lineGap: 34 },
    '6xl': { capHeight: 42, lineGap: 42 },
    '7xl': { capHeight: 50, lineGap: 25 },
    '8xl': { capHeight: 66, lineGap: 30 },
    '9xl': { capHeight: 89, lineGap: 43 },
}

export type FontSize = keyof typeof fontSizeToCapHeight
