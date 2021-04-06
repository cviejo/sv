<script>
	import { assign } from '../../utils/impure.js';

	export let items;
	export let selected;

	const position = (elem, item) => assign(item, { elem });
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
