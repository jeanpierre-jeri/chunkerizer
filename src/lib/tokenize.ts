export async function tokenize({ text }: { text: string }) {
	if (!text) return 0

	try {
		const response = await fetch('/api/tokenize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text })
		})

		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`)
		}

		const data = await response.json()
		return Number(data.tokens)
	} catch (error) {
		console.error('Error fetching token count:', error)
		return 0
	}
}
