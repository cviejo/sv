<script>
	import { pipe, curry, prop } from 'ramda';
	import Hints from './Hints.svelte';
	import { nodes, edges, mode } from '../stores.js';
	import { rect } from '../utils/dom.js';

	let items = [];
	let from = null;

	const bottomLeft = x => ({ x: x.x, y: x.y + x.height });

	const position = pipe(rect, bottomLeft);

	const hint = curry((id, io, index) => ({ id, index, ...position(io.elem) }));

	const ios = (type, xs) => xs.flatMap(x => x[type].map(hint(x.id)));

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
