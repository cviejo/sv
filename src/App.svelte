<script>
	import { onMount, setContext } from 'svelte';
	import Split from 'split.js';
	import Canvas from './components/Canvas.svelte';
	import Editor from './components/editor/Editor.svelte';
	import Modes from './components/Modes.svelte';
	import { nothing } from './utils/function.js';

	import './dummy.js';

	let edit = nothing;

	setContext('edit', (...args) => edit(...args));

	onMount(() => {
		Split(['.left', '.right'], { sizes: [65, 35], direction: 'horizontal' });
		Split(['.top', '.bottom'], { sizes: [65, 35], direction: 'vertical' });
	});
</script>

<div class="left">
	<Canvas />
</div>
<div class="right">
	<div class="top">
		<Editor bind:edit />
	</div>
	<div class="bottom">
		<Editor />
	</div>
</div>

<Modes />

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

	:global(:root) {
		--font-family: Menlo, Monaco, 'Courier New', monospace;
		--background-dark: rgb(31, 31, 31);
		--background-medium: rgb(37, 37, 38);
		--background-light: rgb(51, 51, 51);
		--io-color: rgb(143, 143, 143);
	}

	:global(.gutter) {
		background-color: var(--background-light);
		cursor: row-resize;
		opacity: 0.5;
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
