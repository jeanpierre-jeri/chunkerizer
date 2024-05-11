import { TEXT } from '@/lib/consts'
import { writable } from 'svelte/store'

export interface ChunkerizerStore {
	size: number
	overlap: number
	chunks: string[]
	contentTokens: number
	isLoading: boolean
	content: string
}

export const chunkerizerStore = writable<ChunkerizerStore>({
	size: 128,
	overlap: 0,
	chunks: [],
	contentTokens: 0,
	isLoading: false,
	content: TEXT
})
