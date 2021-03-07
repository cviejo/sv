<script>
	import Square from './Square.svelte';
	import { sizes } from '../../config.js';

	const { step, region, grid } = sizes;
</script>

<style>
	svg {
		background-color: var(--background-medium);
		position: absolute;
		z-index: -1;
	}
</style>

<svg preserveAspectRatio="none" width={grid + 1} height={grid + 1}>
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
