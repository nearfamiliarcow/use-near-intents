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
				<p class="mt-4 text-sm text-near-gray">
					Cross-chain, intent-based swap protocol built on NEAR Protocol. 31 chains. $15.9B+ volume.
				</p>
			</div>
		</div>
	</div>
</footer>
