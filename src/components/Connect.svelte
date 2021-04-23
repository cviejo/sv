<script>
	import { pipe, curry, prop } from 'ramda';
	import Hints from './Hints.svelte';
	import { nodes, edges, mode } from '../stores.js';
	import { moveBy } from '../utils/graph.js';

	let items = [];
	let from = null;

	const hint = curry((node, io, index) => ({ id: node.id, index, ...moveBy(node, io) }));

	const ios = (type, xs) => xs.flatMap(node => node[type].map(hint(node)));

	const selection = x => {
		if (from === null) {
			from = x;
			items = ios('inlets', $nodes);
		} else {
			edges.toggle({
				from: from.id,
				outlet: from.index,
				to: x.id,
				inlet: x.index,
			});
			mode.set('normal');
		}
	};

	items = ios('outlets', $nodes);
</script>

<Hints {items} on:selection={pipe(prop('detail'), selection)} />
