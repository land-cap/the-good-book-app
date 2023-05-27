import { createEffect, createSignal } from 'solid-js'

export const useHover = (el: HTMLElement) => {
	const [value, setValue] = createSignal(false)
	const handleMouseOver = (): void => {
		setValue(true)
	}

	const handleMouseOut = (): void => {
		setValue(false)
	}

	createEffect(() => {
		if (el) {
			el.addEventListener('mouseover', handleMouseOver)
			el.addEventListener('mouseout', handleMouseOut)
			return () => {
				el.removeEventListener('mouseover', handleMouseOver)
				el.removeEventListener('mouseout', handleMouseOut)
			}
		}
	})
	return value()
}
