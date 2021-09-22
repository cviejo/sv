<script>
	import { onMount } from 'svelte';
	import Split from 'split.js';

	import './dummy.js';

	onMount(() => {
		const config = { sizes: [50, 50], direction: 'horizontal', minSize: 10, gutterSize: 4 };
		Split(['.left', '.right'], config);
	});
</script>

<div class="left">
	<slot name="left" />
</div>
<div class="right">
	<slot name="right" />
</div>

<style>
	div {
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.left,
	.right {
		height: 100%;
		float: left;
	}

	:global(.gutter) {
		background-color: var(--background-light);
		cursor: row-resize;
		opacity: 0.7;
	}

	:global(.gutter:hover) {
		opacity: 1;
	}

	:global(.gutter.gutter-horizontal) {
		float: left;
		height: 100%;
		cursor: col-resize;
	}
</style>
