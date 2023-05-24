export type TBook = {
	id: number
	order: number
	name: string
}

export type TBookCode = {
	id: number
	code: string
	book_id: number
}
