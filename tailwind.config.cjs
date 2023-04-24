/** @type {Partial<ThemeConfig & {extend: Partial<ThemeConfig>}> & {screens: Record<"sm" | "md" | "lg" | "xl" | "2xl", string>; columns: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "auto" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl", string>; spacing: Record<"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "20" | "24" | "28" | "32" | "36" | "40" | "44" | "48" | "52" | "56" | "60" | "64" | "72" | "80" | "96" | "px" | "0.5" | "1.5" | "2.5" | "3.5", string>; animation: Record<"none" | "spin" | "ping" | "pulse" | "bounce", string>; aria: Record<"checked" | "disabled" | "expanded" | "hidden" | "pressed" | "readonly" | "required" | "selected", string>; aspectRatio: Record<"auto" | "square" | "video", string>; backgroundImage: Record<"none" | "gradient-to-t" | "gradient-to-tr" | "gradient-to-r" | "gradient-to-br" | "gradient-to-b" | "gradient-to-bl" | "gradient-to-l" | "gradient-to-tl", string>; backgroundPosition: Record<"bottom" | "center" | "left" | "left-bottom" | "left-top" | "right" | "right-bottom" | "right-top" | "top", string>; backgroundSize: Record<"auto" | "cover" | "contain", string>; blur: Record<"0" | "none" | "sm" | "DEFAULT" | "md" | "lg" | "xl" | "2xl" | "3xl", string>; brightness: Record<"0" | "50" | "75" | "90" | "95" | "100" | "105" | "110" | "125" | "150" | "200", string>; borderRadius: Record<"none" | "sm" | "DEFAULT" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full", string>; borderWidth: Record<"0" | "2" | "4" | "8" | "DEFAULT", string>; boxShadow: Record<"sm" | "DEFAULT" | "md" | "lg" | "xl" | "2xl" | "inner" | "none", string>; contrast: Record<"0" | "50" | "75" | "100" | "125" | "150" | "200", string>; content: Record<"none", string>; cursor: Record<"auto" | "default" | "pointer" | "wait" | "text" | "move" | "help" | "not-allowed" | "none" | "context-menu" | "progress" | "cell" | "crosshair" | "vertical-text" | "alias" | "copy" | "no-drop" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out", string>; dropShadow: Record<"sm" | "DEFAULT" | "md" | "lg" | "xl" | "2xl" | "none", string | string[]>; grayscale: Record<"0" | "DEFAULT", string>; hueRotate: Record<"0" | "15" | "30" | "60" | "90" | "180", string>; invert: Record<"0" | "DEFAULT", string>; flex: Record<"1" | "auto" | "initial" | "none", string>; flexGrow: Record<"0" | "DEFAULT", string>; flexShrink: Record<"0" | "DEFAULT", string>; fontFamily: Record<"sans" | "serif" | "mono", string[]>; fontSize: Record<"xs" | "sm" | "composable" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl", [string, {lineHeight: string}]>; fontWeight: Record<"thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black", string>; gridAutoColumns: Record<"auto" | "min" | "max" | "fr", string>; gridAutoRows: Record<"auto" | "min" | "max" | "fr", string>; gridColumn: Record<"auto" | "span-1" | "span-2" | "span-3" | "span-4" | "span-5" | "span-6" | "span-7" | "span-8" | "span-9" | "span-10" | "span-11" | "span-12" | "span-full", string>; gridColumnEnd: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "auto", string>; gridColumnStart: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "auto", string>; gridRow: Record<"auto" | "span-1" | "span-2" | "span-3" | "span-4" | "span-5" | "span-6" | "span-full", string>; gridRowStart: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto", string>; gridRowEnd: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "auto", string>; gridTemplateColumns: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none", string>; gridTemplateRows: Record<"1" | "2" | "3" | "4" | "5" | "6" | "none", string>; keyframes: Record<"spin" | "ping" | "pulse" | "bounce", Record<string, CSSDeclarationList>>; letterSpacing: Record<"tighter" | "tight" | "normal" | "wide" | "wider" | "widest", string>; lineHeight: Record<"3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "none" | "tight" | "snug" | "normal" | "relaxed" | "loose", string>; listStyleType: Record<"none" | "disc" | "decimal", string>; minHeight: Record<"0" | "full" | "screen" | "min" | "max" | "fit", string>; minWidth: Record<"0" | "full" | "min" | "max" | "fit", string>; objectPosition: Record<"bottom" | "center" | "left" | "left-bottom" | "left-top" | "right" | "right-bottom" | "right-top" | "top", string>; opacity: Record<"0" | "5" | "10" | "20" | "25" | "30" | "40" | "50" | "60" | "70" | "75" | "80" | "90" | "95" | "100", string>; order: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "first" | "last" | "none", string>; outlineOffset: Record<"0" | "1" | "2" | "4" | "8", string>; outlineWidth: Record<"0" | "1" | "2" | "4" | "8", string>; ringOffsetWidth: Record<"0" | "1" | "2" | "4" | "8", string>; ringWidth: Record<"0" | "1" | "2" | "4" | "8" | "DEFAULT", string>; rotate: Record<"0" | "1" | "2" | "3" | "6" | "12" | "45" | "90" | "180", string>; saturate: Record<"0" | "50" | "100" | "150" | "200", string>; scale: Record<"0" | "50" | "75" | "90" | "95" | "100" | "105" | "110" | "125" | "150", string>; sepia: Record<"0" | "DEFAULT", string>; skew: Record<"0" | "1" | "2" | "3" | "6" | "12", string>; strokeWidth: Record<"0" | "1" | "2", string>; textDecorationThickness: Record<"0" | "1" | "2" | "4" | "8" | "auto" | "from-font", string>; textUnderlineOffset: Record<"0" | "1" | "2" | "4" | "8" | "auto", string>; transformOrigin: Record<"center" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left" | "top-left", string>; transitionDelay: Record<"75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000", string>; transitionDuration: Record<"75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000" | "DEFAULT", string>; transitionProperty: Record<"none" | "all" | "DEFAULT" | "colors" | "opacity" | "shadow" | "transform", string>; transitionTimingFunction: Record<"DEFAULT" | "linear" | "in" | "out" | "in-out", string>; willChange: Record<"auto" | "scroll" | "contents" | "transform", string>; zIndex: Record<"0" | "10" | "20" | "30" | "40" | "50" | "auto", string>}} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const monoColor = colors.slate;

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: monoColor,
        gray: monoColor,
        black: monoColor[900],
        offWhite: monoColor[50],
        whiteOnDark: monoColor[300]
      },
      fontFamily: {
        sans: ["DM Sans", "DM Mono", "Plus Jakarta Sans", "Inknut Antiqua", "Cormorant Upright", "Be Vietnam Pro", "MonoLisa", "Schibsted Grotesk", "Bellefair", "Cormorant infant", "Urbanist", "Archivo Narrow", "Karla", "IBM Plex Sans", "Work Sans", "Inter", "sans-serif"]
      },
      fontSize: {
        xs: ["11.4286px", { lineHeight: "16px" }],
        sm: ["14.2857px", { lineHeight: "20px" }],
        base: ["15.7143px", { lineHeight: "22px" }],
        lg: ["18.5714px", { lineHeight: "26px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24.2857px", { lineHeight: "34px" }],
        "3xl": ["30px", { lineHeight: "42px" }],
        "4xl": ["37.1429px", { lineHeight: "52px" }],
        "5xl": ["48.5714px", { lineHeight: "68px" }],
        "6xl": ["60px", { lineHeight: "84px" }],
        "7xl": ["48.5714px", { lineHeight: "75px" }],
        "8xl": ["94.2857px", { lineHeight: "96px" }],
        "9xl": ["127.1429px", { lineHeight: "132px" }]
      },
      ringWidth: {
        ...defaultTheme.ringWidth,
        3: "3px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
