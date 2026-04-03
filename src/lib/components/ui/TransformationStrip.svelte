<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import type { TransformationData } from '$lib/types';

	interface Props {
		transformation: TransformationData;
		partnerName?: string;
	}

	let { transformation, partnerName = '' }: Props = $props();
</script>

<div class="flex flex-col items-stretch gap-0 overflow-hidden rounded-xl border border-near-border shadow-sm sm:flex-row">
	<!-- BEFORE panel -->
	<div class="flex-1 bg-red-50 p-5 sm:p-6">
		<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-500 sm:text-xs">
			Before NEAR Intents
		</p>
		<p class="text-base font-semibold text-red-900 sm:text-lg">{transformation.before.headline}</p>
		<p class="mt-2 text-sm leading-relaxed text-red-700/80">{transformation.before.body}</p>
	</div>

	<!-- Arrow divider -->
	<div class="flex items-center justify-center bg-near-border px-0 py-3 sm:px-4 sm:py-0">
		<!-- Horizontal on desktop, vertical on mobile -->
		<div class="flex h-8 w-full items-center justify-center sm:h-auto sm:w-8">
			<ArrowRight
				size={20}
				class="hidden shrink-0 text-near-gray-medium sm:block"
			/>
			<!-- Mobile: rotated arrow -->
			<div class="block sm:hidden rotate-90">
				<ArrowRight size={20} class="text-near-gray-medium" />
			</div>
		</div>
	</div>

	<!-- AFTER panel -->
	<div class="flex-1 bg-near-orange-light p-5 sm:p-6">
		<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-orange sm:text-xs">
			With NEAR Intents
		</p>
		<p class="text-base font-semibold text-near-dark sm:text-lg">{transformation.after.headline}</p>
		<p class="mt-2 text-sm leading-relaxed text-near-dark/80">{transformation.after.body}</p>
	</div>
</div>
