<script>
	import { mode, visual } from '../stores.js';
</script>

<style>
	div {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.45);
	}
</style>

{#if /^visual/.test($mode)}
	<div
		style="left: {$visual.left}px; top: {$visual.top}px; width: {$visual.width}px; height: {$visual.height}px;" />
{/if}
