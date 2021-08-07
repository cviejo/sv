<script>
	import Square from './Square.svelte';
	import { sizes, svg } from '../../config.js';

	const { step, region, grid } = sizes;
</script>

<!-- svelte-ignore component-name-lowercase -->
<svg {...svg}>
	<defs>
		<Square id="inner-square" {step} strokeWidth="0.2" />
		<Square id="outer-square" step={region} strokeWidth="1.15">
			<rect width={region} height={region} fill="url(#inner-square)" />
		</Square>
	</defs>
	<g on:click>
		<rect width={grid + 1} height={grid + 1} fill="url(#outer-square)" />
	</g>
</svg>

<style>
	svg {
		background-color: var(--background-medium);
		position: absolute;
		z-index: -1;
	}
</style>
