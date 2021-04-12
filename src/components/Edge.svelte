<script>
	import { onMount, tick } from 'svelte';
	import { nodes } from '../stores.js';
	import { center } from '../utils/dom';

	export let edge;

	let d = '';

	const update = (a, b) => {
		const mod = Math.abs(b.y - b.y) / 2.2;
		d = `M ${a.x},${a.y} C ${a.x},${a.y + mod} ${b.x},${b.y - mod} ${b.x},${b.y}`;
	};

	const from = nodes.byId(edge.from);
	const to = nodes.byId(edge.to);

	$: outlet = $from.outlets[edge.outlet];
	$: inlet = $to.inlets[edge.inlet];

	$: if (outlet.elem && inlet.elem) {
		tick().then(() => update(center(outlet.elem), center(inlet.elem)));
	}

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

{#if d}
	<path {d} />
{/if}
