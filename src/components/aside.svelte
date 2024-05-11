<script lang="ts">
	import Cog6ToothIcon from '@/components/icons/cog-6-tooth.svelte'
	import Slider from '@/components/ui/slider/slider.svelte'
	import { chunkerizerStore } from '@/stores/settings'
	import Label from './ui/label/label.svelte'
	import Textarea from './ui/textarea/textarea.svelte'
	import Button from './ui/button/button.svelte'
	import { TEXT } from '@/lib/consts'
	import { chunkerize } from '@/lib/chunkerize'
	import { tokenize } from '@/lib/tokenize'

	const handleClick = async () => {
		$chunkerizerStore.isLoading = true

		const [res, tokens] = await Promise.all([
			chunkerize({
				content: $chunkerizerStore.content,
				overlap: $chunkerizerStore.overlap,
				size: $chunkerizerStore.size
			}),
			tokenize({ text: TEXT })
		])

		$chunkerizerStore.isLoading = false
		$chunkerizerStore.contentTokens = tokens
		if (res) $chunkerizerStore.chunks = res.chunks
	}
</script>

<aside class="border-l col-span-full md:col-span-1 relative font-space-grotesk order-2">
	<div class="grid gap-3">
		<header class="p-3 z-10 border-b items-center flex gap-2 relative justify-between h-12">
			<p class="text-xs uppercase tracking-wide text-default-500 flex items-center gap-1">
				<Cog6ToothIcon class="w-4 h-4" />
				<span>Settings</span>
			</p>

			<!-- <ModeToggle /> -->
			<div>mode toggle</div>
			<!-- <ModeToggle /> -->
		</header>
		<div class="py-3 px-6">
			<div class="grid gap-6">
				<div>
					<label for="chunk-size">Chunk Size</label>
					<Slider
						id="chunk-size"
						value={[$chunkerizerStore.size]}
						onValueChange={(value) => {
							$chunkerizerStore.size = value[0]
						}}
						max={1024}
						min={64}
						step={16}
					/>
					<span>{$chunkerizerStore.size}</span>
				</div>
				<div>
					<label for="chunk-overlap">Chunk Overlap</label>
					<Slider
						id="chunk-overlap"
						value={[$chunkerizerStore.overlap]}
						max={$chunkerizerStore.size / 2}
						min={0}
						step={8}
						onValueChange={(value) => {
							$chunkerizerStore.overlap = value[0]
						}}
					/>
					<span>
						{$chunkerizerStore.overlap}
					</span>
				</div>
				<div>
					<Label for="message">Your message</Label>
					<Textarea class="text-sm resize-none" bind:value={$chunkerizerStore.content} />
				</div>
				<Button disabled={$chunkerizerStore.isLoading} on:click={handleClick}>chunkerize</Button>
			</div>
		</div>
	</div>
</aside>
