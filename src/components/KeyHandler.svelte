<script>
	import { getContext, tick } from 'svelte';
	import { when, cond, __, whereEq, chain, prop, pipe, thunkify, propEq, T } from 'ramda';
	import { preventDefault, stopPropagation } from '../utils/dom.js';
	import { idEq } from '../utils/relation.js';
	import { nothing, forEachAsync } from '../utils/function.js';
	import { moveBy } from '../utils/graph.js';
	import { setMode, updateCursor } from '../utils/thunks.js';
	import { back, word, end } from '../utils/motions.js';
	import { focus, cursor, mode, focused, selection, nodes } from '../stores.js';
	import { sizes } from '../config.js';
	import specs from '../specs.js';

	const { step, grid } = sizes;

	const edit = getContext('edit');

	const getNodes = () => $nodes;

	const modeEquals = thunkify(x => $mode === x);

	const buf = fn => ($selection.length ? $selection : [$focused]).forEach(fn);

	const motion = thunkify(fn => cursor.set(fn($cursor, $nodes)));

	const o = pipe(preventDefault, updateCursor({ y: step * 2 }), setMode('insert'));

	const moveNode = thunkify(x => {
		buf(id => {
			const node = $nodes.find(idEq(id));
			if (node) {
				node.update(moveBy(x));
			}
		});
		updateCursor(x)();
	});

	const editSpec = spec => {
		edit(spec.code, code => {
			/* const updateNode = x => (x.assign({ updated: Date.now() }), tick()); */
			const updateNode = x => tick().then(() => x.assign({ updated: Date.now() }));
			spec.code = code;
			forEachAsync(updateNode, nodes.filter(propEq('spec', spec.name)));
			/* .forEach(updateNode); */
		});
		focus.set('editor');
	};

	const inlets = pipe(getNodes, chain(prop('inlets')), console.log);

	const normal = cond([
		[whereEq({ key: 'l', ctrlKey: true }), moveNode({ x: step })],
		[whereEq({ key: 'h', ctrlKey: true }), moveNode({ x: -step })],
		[whereEq({ key: 'j', ctrlKey: true }), moveNode({ y: step })],
		[whereEq({ key: 'k', ctrlKey: true }), moveNode({ y: -step })],
		[whereEq({ key: 'x' }), () => buf(x => nodes.remove(x))],
		[whereEq({ key: '0' }), updateCursor({ x: -grid })],
		[whereEq({ key: '$' }), updateCursor({ x: grid })],
		[whereEq({ key: 'g' }), updateCursor({ y: -grid })],
		[whereEq({ key: 'G' }), updateCursor({ y: grid })],
		[whereEq({ key: 'l' }), updateCursor({ x: step })],
		[whereEq({ key: 'h' }), updateCursor({ x: -step })],
		[whereEq({ key: 'j' }), updateCursor({ y: step })],
		[whereEq({ key: 'k' }), updateCursor({ y: -step })],
		[whereEq({ key: 'e' }), motion(end)],
		[whereEq({ key: 'w' }), motion(word)],
		[whereEq({ key: 'b' }), motion(back)],
		[whereEq({ key: 'o' }), o],
		/* [whereEq({ key: 'i' }), pipe(preventDefault, setMode('insert'))], */
		[
			whereEq({ key: 'i' }),
			when(modeEquals('normal'), x => {
				if ($focused) {
					preventDefault(x);
					const node = $nodes.find(idEq($focused));
					const spec = specs.get(node.spec);
					editSpec(spec);
				}
			}),
		],
	]);

	const keydown = cond([
		// global
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[() => $focus.id === 'editor', nothing],
		[whereEq({ key: 'Escape' }), setMode('normal')],
		[modeEquals('insert'), nothing],
		[whereEq({ key: 'f' }), setMode('connect')],
		[whereEq({ key: 't' }), setMode('to')],
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[T, normal],
	]);
</script>

<svelte:window on:keydown|capture={keydown} />
