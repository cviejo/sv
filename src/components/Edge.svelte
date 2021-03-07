<script>
	import { nodes } from '../stores.js';
	import { idEq } from '../utils/relation';
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

	$: if (out.node && inl.node) {
		const x1 = $a.x + out.node.offsetLeft + out.node.offsetWidth / 2;
		const y1 = $a.y + $a.height + out.node.offsetHeight / 2;
		const x2 = $b.x + inl.node.offsetLeft + inl.node.offsetWidth / 2;
		const y2 = $b.y - inl.node.offsetHeight / 2;

		const mod = Math.abs(y2 - y1) / 2.2;

		d = `M ${x1},${y1} C ${x1},${y1 + mod} ${x2},${y2 - mod} ${x2},${y2}`;
	}

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
