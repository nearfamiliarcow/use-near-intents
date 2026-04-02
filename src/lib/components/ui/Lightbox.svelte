<script lang="ts">
	import { X } from 'lucide-svelte';

	let open = $state(false);
	let currentSrc = $state('');
	let currentAlt = $state('');

	export function show(src: string, alt: string = '') {
		currentSrc = src;
		currentAlt = alt;
		open = true;
	}

	function close() {
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
		onclick={close}
		role="dialog"
		aria-modal="true"
		aria-label="Image preview"
	>
		<!-- Close button -->
		<button
			onclick={close}
			class="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
			aria-label="Close"
		>
			<X size={24} />
		</button>

		<!-- Image -->
		<img
			src={currentSrc}
			alt={currentAlt}
			class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		/>
	</div>
{/if}
