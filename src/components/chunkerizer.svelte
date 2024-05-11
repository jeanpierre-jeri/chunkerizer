<script lang="ts">
	import Button from './ui/button/button.svelte'
	import Skeleton from './ui/skeleton/skeleton.svelte'
	import { chunkerizerStore } from '@/stores/settings'
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator
	} from './ui/breadcrumb'
	import Separator from './ui/separator/separator.svelte'
	import BookOpen from './icons/book-open.svelte'
	import Cog_6Tooth from './icons/cog-6-tooth.svelte'
	import Sparkles from './icons/sparkles.svelte'
	import { chunkerize } from '@/lib/chunkerize'

	const handleClick = async () => {
		$chunkerizerStore.isLoading = true
		const res = await chunkerize({
			content: $chunkerizerStore.content,
			overlap: $chunkerizerStore.overlap,
			size: $chunkerizerStore.size
		})

		$chunkerizerStore.isLoading = false
		if (res) $chunkerizerStore.chunks = res.chunks
	}
</script>

<main class="grid col-span-full md:col-span-4 items-start grid-rows-[auto_1fr] relative h-dvh">
	<section class="grid gap-3 font-space-grotesk p-3 border-b z-10 backdrop-blur-sm h-12">
		<div class="flex gap-2 justify-between items-center">
			<div>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>✂️</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>TextSplitter</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>SentenceSplitter</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div class="flex justify-end items-center gap-4">
				<p class="text-xs uppercase flex gap-1 items-center">
					{#if $chunkerizerStore.isLoading}
						<Skeleton class="w-2.5 h-2.5 bg-gray-300 rounded-xl" />
					{:else}
						<span>{$chunkerizerStore.contentTokens ?? 0}</span>
					{/if}

					<span>Chunks</span>
				</p>
				<div class="h-4 w-[1px] bg-content4" />
				<p class="text-xs uppercase flex gap-1 items-center">
					{#if $chunkerizerStore.isLoading}
						<Skeleton class="w-2.5 h-2.5 bg-gray-300 rounded-xl" />
					{:else}
						<span>{$chunkerizerStore.contentTokens ?? 0}</span>
					{/if}
					<span class="text-xs">Tokens</span>
				</p>
			</div>
		</div>
	</section>
	<div class="grid max-h-screen h-full py-8 items-start">
		{#if $chunkerizerStore.isLoading}
			<div class="flex flex-col gap-3 items-start py-8 w-full max-w-xl mx-auto">
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-5/6 bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-4/6 bg-gray-300 h-4 rounded-xl" />
			</div>
			<div class="flex flex-col gap-3 items-start py-8 w-full max-w-xl mx-auto">
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-5/6 bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-4/6 bg-gray-300 h-4 rounded-xl" />
			</div>
			<div class="flex flex-col gap-3 items-start py-8 w-full max-w-xl mx-auto">
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-5/6 bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-full bg-gray-300 h-4 rounded-xl" />
				<Skeleton class="w-4/6 bg-gray-300 h-4 rounded-xl" />
			</div>
		{/if}

		{#if $chunkerizerStore.chunks.length > 0 && !$chunkerizerStore.isLoading}
			<div class="mx-auto mb-auto rounded-3xl border px-6 py-8 w-full max-w-xl grid gap-4">
				<h2 class="text-sm text-default-500">Split with Precision</h2>
				<p class="text-xl font-noto-serif">
					Visualize the overlap between chunks to ensure that the split is done with precision.
				</p>
				<Separator />
				<h2 class="text-sm text-default-500">How to use</h2>
				<ol class="grid gap-4 text-md leading-tight list-decimal font-noto-serif px-4">
					<li class="">
						<p class="flex justify-between items-center">
							Enter your text in the input box
							<BookOpen class="w-4 h-4 shrink-0" />
						</p>
					</li>
					<li class="">
						<p class="flex justify-between items-center">
							Adjust the chunk size and overlap live
							<Cog_6Tooth class="w-4 h-4 shrink-0" />
						</p>
					</li>
					<li class="">
						<p class="flex justify-between items-center">
							Click on the chunk button
							<Sparkles class="w-4 h-4 shrink-0" />
						</p>
					</li>
				</ol>
				<Separator />
				<div class="flex gap-2 items-center">
					<Button class="w-fit" variant="outline" on:click={handleClick}>Run a demo</Button>
					<span class="text-xs text-default-400">From a text from Wikipedia</span>
				</div>
			</div>
		{/if}

		{#if $chunkerizerStore.chunks.length === 0 && !$chunkerizerStore.isLoading}
			<div class="max-w-2xl mx-auto">
				<!-- <ol class="grid gap-4 text-md leading-tight list-decimal font-noto-serif">
					{highlightOverlap(chunkerizerStore.chunks)}
				</ol> -->
			</div>
		{/if}
	</div>
</main>
