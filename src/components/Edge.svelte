<script>
	import { nodes } from '../stores.js';
	import { idEq } from '../utils/relation';
	import { elementCenter } from '../utils/dom';
	import { onMount } from 'svelte';

	export let from;
	export let to;
	export let outlet;
	export let inlet;

	const a = $nodes.find(idEq(from));
	const b = $nodes.find(idEq(to));

	let d = '';

	$: out = $a.outlets[outlet];
	$: inl = $b.inlets[inlet];

	$: if (out.elem && inl.elem) {
		const { x: x1, y: y1 } = elementCenter(out.elem);
		const { x: x2, y: y2 } = elementCenter(inl.elem);

		const mod = Math.abs(y2 - y1) / 2.2;

		d = `M ${x1},${y1} C ${x1},${y1 + mod} ${x2},${y2 - mod} ${x2},${y2}`;
	}

	// don't remember why this is here 🤔
	onMount(() => {
		out.stream.map(inl.stream);
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
