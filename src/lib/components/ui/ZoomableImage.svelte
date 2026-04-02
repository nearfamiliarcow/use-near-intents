<script lang="ts">
	import { X } from 'lucide-svelte';

	interface Props {
		src: string;
		alt?: string;
		caption?: string;
		class?: string;
	}

	let { src, alt = '', caption = '', class: className = '' }: Props = $props();

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

<!-- Clickable thumbnail -->
<button
	onclick={() => (open = true)}
	class="cursor-zoom-in {className}"
	aria-label="View {alt || 'image'} fullscreen"
>
	<img {src} {alt} class="h-auto w-full" />
</button>

<!-- Fullscreen overlay -->
{#if open}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm"
		onclick={() => (open = false)}
		role="dialog"
		aria-modal="true"
		aria-label="Image preview"
	>
		<button
			onclick={() => (open = false)}
			class="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 sm:right-5 sm:top-5"
			aria-label="Close"
		>
			<X size={22} />
		</button>

		<img
			{src}
			{alt}
			class="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		/>

		{#if caption || alt}
			<div class="mt-4 max-w-lg px-4 text-center" onclick={(e) => e.stopPropagation()}>
				<p class="text-sm font-medium text-white sm:text-base">{caption || alt}</p>
			</div>
		{/if}
	</div>
{/if}
