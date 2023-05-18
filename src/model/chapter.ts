export enum CONTENT_TYPE {
	ChapterTitle = 'chapterTitle',
	SectionTitle = 'sectionTitle',
	Verse = 'verse',
	Quote = 'quote',
}

export enum VERSE_CONTENT_TYPE {
	Text = 'text',
	JesusWords = 'jesusWords',
}

export type Verse = {
	type: CONTENT_TYPE.Verse
	verseNumber: number
	content: { type: VERSE_CONTENT_TYPE.Text | VERSE_CONTENT_TYPE.JesusWords; content: string }[]
}

export type Quote = {
	type: CONTENT_TYPE.Quote
	verseNumber?: number
	content: string
}

export type Chapter = (
	| {
			type: CONTENT_TYPE.ChapterTitle | CONTENT_TYPE.SectionTitle
			content: string
	  }
	| Verse
	| Quote
)[]
