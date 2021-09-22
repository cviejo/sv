<script>
	import { setContext } from 'svelte';
	import Split from './Split.svelte';
	import Canvas from './components/Canvas.svelte';
	import Editor from './components/editor/Editor.svelte';
	import Modes from './components/Modes.svelte';
	import { noop } from './utils/function.js';

	import './dummy.js';

	let edit = noop;

	setContext('edit', (...args) => edit(...args));
</script>

<Split>
	<Canvas slot="left" />
	<Editor slot="right" bind:edit />
</Split>

<Modes />
