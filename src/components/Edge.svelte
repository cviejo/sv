<script>
	import { onMount } from 'svelte';
	import { nodes } from '../stores.js';
	import { center } from '../utils/dom';

	export let from;
	export let to;
	export let outlet;
	export let inlet;

	let d = '';

	const source = nodes.byId(from);
	const target = nodes.byId(to);

	$: sourceIO = $source.outlets[outlet];
	$: targetIO = $target.inlets[inlet];

	$: if (sourceIO.elem && targetIO.elem) {
		const { x: x1, y: y1 } = center(sourceIO.elem);
		const { x: x2, y: y2 } = center(targetIO.elem);

		const mod = Math.abs(y2 - y1) / 2.2;

		d = `M ${x1},${y1} C ${x1},${y1 + mod} ${x2},${y2 - mod} ${x2},${y2}`;
	}

	// don't remember why this is here 🤔
	onMount(() => {
		sourceIO.stream.map(targetIO.stream);
	});
</script>

<style>
	path {
		stroke: var(--io-color);
		stroke-width: 2;
		fill: transparent;
	}
</style>

{#if d}
	<path {d} />
{/if}
