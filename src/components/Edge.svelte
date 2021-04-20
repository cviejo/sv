<script>
	import { onMount, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import { nodes } from '../stores.js';
	import { center } from '../utils/dom';

	export let edge;

	const from = nodes.byId(edge.from);

	const to = nodes.byId(edge.to);

	const path = writable('');

	const pathMod = (a, b) => Math.abs(b.y - a.y) / 2.2;

	const data = (a, b, mod) =>
		`M ${a.x},${a.y} C ${a.x},${a.y + mod} ${b.x},${b.y - mod} ${b.x},${b.y}`;

	const update = (a, b) => path.set(data(a, b, pathMod(a, b)));

	$: outlet = $from.outlets[edge.outlet];

	$: inlet = $to.inlets[edge.inlet];

	// tick to finish both node movements
	$: tick().then(() => update(center(outlet.elem), center(inlet.elem)));

	onMount(() => {
		const stream = outlet.stream.map(inlet.stream);

		return () => stream.end(1);
	});
</script>

<style>
	path {
		stroke: var(--io-color);
		stroke-width: 2;
		fill: transparent;
	}
</style>

{#if $path}
	<path d={$path} />
{/if}
