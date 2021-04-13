<script>
	import { onMount, tick } from 'svelte';
	import { nodes } from '../stores.js';
	import { center } from '../utils/dom';

	export let edge;

	let path = '';

	const update = (a, b) => {
		const mod = Math.abs(b.y - a.y) / 2.2;
		path = `M ${a.x},${a.y} C ${a.x},${a.y + mod} ${b.x},${b.y - mod} ${b.x},${b.y}`;
	};

	const from = nodes.byId(edge.from);
	const to = nodes.byId(edge.to);

	// node as store to react to position changes
	$: outlet = $from.outlets[edge.outlet];
	$: inlet = $to.inlets[edge.inlet];

	// tick to finish both nodes move
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

{#if path}
	<path d={path} />
{/if}
