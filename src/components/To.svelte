<script>
	import { pipe, prop } from 'ramda';
	import Hints from './Hints.svelte';
	import { nodes, cursor } from '../stores.js';
	import { setMode } from '../utils/thunks.js';

	const selection = pipe(cursor.set, setMode('normal'));
</script>

<Hints items={$nodes} on:selection={pipe(prop('detail'), selection)} />
