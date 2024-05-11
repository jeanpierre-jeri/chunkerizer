import type { ChunkerizerStore } from '@/stores/settings'

interface Props {
	content: string
	size: ChunkerizerStore['size']
	overlap: ChunkerizerStore['overlap']
}

export async function chunkerize({ content, overlap, size }: Props) {
	try {
		const res = await fetch('/api/chunkerize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: content,
				size,
				overlap
			})
		})

		if (!res.ok) {
			return null
		}

		const data = await res.json()

		return {
			chunks: data?.textSplits
		}
	} catch (error) {
		console.error(error)
		return null
	}
}
