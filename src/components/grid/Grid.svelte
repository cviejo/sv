<script>
	import Square from './Square.svelte';
	import { sizes, svg } from '../../config.js';
	import { settings } from '../../stores.js';

	const { step, region, grid } = sizes;
</script>

<!-- svelte-ignore component-name-lowercase -->
<svg {...svg}>
	{#if $settings.gridActive}
		<defs>
			<Square id="inner-square" {step} strokeWidth="0.2" />
			<Square id="outer-square" step={region} strokeWidth="1.15">
				<rect width={region} height={region} fill="url(#inner-square)" />
			</Square>
		</defs>
		<g>
			<rect width={grid + 1} height={grid + 1} fill="url(#outer-square)" />
		</g>
	{:else}
		<path
			d="M {grid} 0 L 0 0 0 {grid}"
			fill="none"
			stroke="black"
			stroke-width="1.15"
			stroke-opacity="0.2"
		/>
	{/if}
</svg>

<style>
	svg {
		background-color: var(--background-medium);
		position: absolute;
		z-index: -1;
	}
</style>
