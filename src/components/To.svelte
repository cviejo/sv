<script>
	import { pipe, prop } from 'ramda';
	import Hints from './Hints.svelte';
	import { nodes, cursor, thunks } from '../stores.js';

	const selection = pipe(cursor.set, thunks.setMode('normal'));
</script>

<Hints items={$nodes} on:selection={pipe(prop('detail'), selection)} />
