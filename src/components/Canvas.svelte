<script>
	import { onMount } from 'svelte';
	import { nodes, focus, edges } from '../stores.js';
	import panzoom from '../utils/panzoom.js';
	import { sizes } from '../config.js';
	import Node from './node/Node.svelte';
	import Grid from './grid/Grid.svelte';
	import Cursor from './Cursor.svelte';
	import Edge from './Edge.svelte';
	import Visual from './Visual.svelte';

	onMount(() => focus.set('graph'));
</script>

<style>
	.board {
		width: var(--grid-size);
		height: var(--grid-size);
		top: 0px;
		left: 0px;
	}
	.wrapper {
		background-color: var(--background-medium);
		width: 100%;
		height: 100%;
		outline: none;
		overflow: hidden;
	}
</style>

<div class="wrapper" use:focus.register={'graph'}>
	<div class="board" style="--grid-size({sizes.grid}px)" use:panzoom>
		<Grid />
		<svg preserveAspectRatio="none" width={sizes.grid} height={sizes.grid}>
			{#each $edges as x (x)}
				<Edge {...x} />
			{/each}
		</svg>
		{#each $nodes as { id } (id)}
			<Node {id} />
		{/each}
		<Visual />
		<Cursor />
	</div>
</div>
