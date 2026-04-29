<script lang="ts">
	import { base } from '$app/paths';
</script>

<footer class="border-t border-near-border bg-near-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
			<div>
				<h3 class="text-sm font-semibold text-near-text">Resources</h3>
				<ul class="mt-4 space-y-2">
					<li><a href="https://docs.near-intents.org" target="_blank" rel="noopener noreferrer" class="text-sm text-near-gray hover:text-near-orange">Documentation</a></li>
					<li><a href="https://explorer.near-intents.org" target="_blank" rel="noopener noreferrer" class="text-sm text-near-gray hover:text-near-orange">Explorer</a></li>
					<li><a href="https://near.org" target="_blank" rel="noopener noreferrer" class="text-sm text-near-gray hover:text-near-orange">NEAR Protocol</a></li>
					<li><a href="https://dune.com/near/near-intents" target="_blank" rel="noopener noreferrer" class="text-sm text-near-gray hover:text-near-orange">Dune Dashboard</a></li>
				</ul>
			</div>
			<div>
				<img
					src="{base}/logos/NEAR_Intents_Logo_Primary_Black.svg"
					alt="NEAR Intents"
					class="h-6 w-auto"
				/>
				<p class="mt-4 text-xs leading-relaxed text-near-gray">
					This page is for general informational purposes only and does not constitute technical, financial, or legal advice. It is not a complete or authoritative description of NEAR Intents or its behaviour. The NEAR Intents ecosystem is evolving, and features, integrations, and metrics may change over time. Integrators should review official documentation and independently assess the system's design and risks before use. Execution depends on third-party participants and market conditions, and outcomes are not guaranteed.
				</p>
			</div>
		</div>
	</div>
</footer>
