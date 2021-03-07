<script>
	import { pickRename } from '../../utils/object.js';
	import { assign } from '../../utils/impure.js';

	export let items;
	export let selected;

	/* const rect = pickRename({ */
	/* 	offsetWidth: 'width', */
	/* 	offsetHeight: 'height', */
	/* 	offsetLeft: 'left', */
	/* 	offsetTop: 'top', */
	/* }); */

	const position = (node, io) => assign(io, { node });

	/* const position = (node, io) => assign(io, rect(node)); */
	/* const log = (x) => console.log(x, rect(x)); */
</script>

<style>
	.io-bar {
		background-color: rgb(108, 108, 108, 0.3);
		width: 100%;
		height: 4px;
		display: flex;
		justify-content: space-between;
		z-index: 200;
	}
	.selected {
		background-color: rgb(180, 142, 175);
	}
	.io {
		background-color: var(--io-color);
		width: 10px;
	}
</style>

<div class="io-bar" class:selected>
	{#each items as io (io)}
		<div class="io" use:position={io} />
	{/each}
</div>
