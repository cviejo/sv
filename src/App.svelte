<script>
	import { onMount, setContext } from 'svelte';
	import { pipe, thunkify } from 'ramda';
	import Split from 'split.js';
	import Canvas from './components/Canvas.svelte';
	import Test from './components/Test.svelte';
	import Editor from './components/editor/Editor.svelte';
	import KeyHandler from './components/KeyHandler.svelte';
	import { cursor, mode, nodes } from './stores.js';
	import { path } from './utils/object.js';

	import './dummy.js';

	let edit = {};

	const nodeProps = spec => ({ ...$cursor, spec });

	const setMode = thunkify(mode.set);

	const onSpec = pipe(path('detail.value'), nodeProps, nodes.add, setMode('normal'));

	setContext('edit', (...args) => edit(...args));

	onMount(() => Split(['.left', '.right'], { sizes: [65, 35] }));
</script>

<style>
	.split {
		box-sizing: border-box;
		overflow-y: auto;
		overflow-x: hidden;
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
		float: left;
		cursor: col-resize;
		height: 100%;
		opacity: 0.5;
	}

	:global(.gutter:hover) {
		opacity: 1;
	}
</style>

<div class="left split">
	<Canvas />
</div>
<div class="right split">
	<Editor bind:edit />
</div>

<KeyHandler />

{#if $mode === 'insert'}
	<Test on:select={onSpec} />
{/if}
