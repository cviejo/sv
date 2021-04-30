<script>
	import { onMount, tick } from 'svelte';
	import { pipe } from 'ramda';
	import { writable } from 'svelte/store';
	import { nodes } from '../stores.js';
	import { center } from '../utils/dom.js';
	import { moveBy } from '../utils/graph.js';

	export let edge;

	const from = nodes.byId(edge.from);

	const to = nodes.byId(edge.to);

	const path = writable('');

	const pathMod = (a, b) => Math.abs(b.y - a.y) / 2.2;

	const data = (a, b, mod) =>
		`M ${a.x},${a.y} C ${a.x},${a.y + mod} ${b.x},${b.y - mod} ${b.x},${b.y}`;

	const update = (a, b) => path.set(data(a, b, pathMod(a, b)));

	const rect = (node, io) => moveBy({ x: node.x, y: node.y - io.height }, io);

	const point = pipe(rect, center);

	$: outlet = $from.outlets[edge.outlet];

	$: inlet = $to.inlets[edge.inlet];

	// tick to finish both node movements before update
	$: tick().then(() => update(point($from, outlet), point($to, inlet)));

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
