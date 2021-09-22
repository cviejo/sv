<script>
	import { onMount } from 'svelte';
	import { flip } from 'ramda';
	import { mode, nodes, focus, edges, cursor, selection } from '../stores.js';
	import panzoom from '../utils/panzoom.js';
	import { sizes, svg } from '../config.js';
	import Node from './node/Node.svelte';
	import Grid from './grid/Grid.svelte';
	import Cursor from './Cursor.svelte';
	import Connect from './Connect.svelte';
	import To from './To.svelte';
	import Edge from './Edge.svelte';
	import Visual from './Visual.svelte';

	const focusable = flip(focus.register);

	$: modal = {
		visual: Visual,
		'visual-line': Visual,
		connect: Connect,
		to: To,
	}[$mode];

	cursor.set({ x: 0, y: 0 });

	onMount(() => focus.set('graph'));
</script>

<div class="canvas-wrapper" use:focusable={'graph'}>
	<div class="board" style="--grid-size({sizes.grid}px)" use:panzoom>
		<Grid />
		<!-- TODO: ask about this linting warning -->
		<!-- svelte-ignore component-name-lowercase -->
		<svg {...svg}>
			{#each $edges as edge (edge.id)}
				<Edge {edge} />
			{/each}
		</svg>
		{#each $nodes as { id } (id)}
			<Node {id} selected={$selection.includes(id)} />
		{/each}
		<Cursor />
		<svelte:component this={modal} />
	</div>
</div>

<style>
	.board {
		width: var(--grid-size);
		height: var(--grid-size);
		top: 0px;
		left: 0px;
	}

	:global(.canvas-wrapper) {
		background-color: var(--background-medium);
		width: 100%;
		height: 100%;
		outline: none;
		overflow: hidden;
	}

	:global(.canvas-wrapper *) {
		font-family: var(--font-family);
		font-size: 14px;
		line-height: 23px;
	}

	:global(.canvas-wrapper pre) {
		font-family: var(--font-family-mono);
		font-size: 14px;
	}
</style>
