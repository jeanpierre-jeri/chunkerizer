<script lang="ts">
	import Aside from '@/components/aside.svelte'
	import Chunkerizer from '@/components/chunkerizer.svelte'
</script>

<main class="flex justify-center grid-rows-[auto_1fr]">
	<div class="grid grid-cols-1 md:grid-cols-5 w-full">
		<Aside />
		<Chunkerizer />
	</div>
</main>
