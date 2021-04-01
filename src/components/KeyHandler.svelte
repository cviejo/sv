<script>
	import { getContext } from 'svelte';
	import { when, cond, __, whereEq, pipe, thunkify, propEq } from 'ramda';
	import { preventDefault, stopPropagation } from '../utils/dom.js';
	import { idEq } from '../utils/relation.js';
	import { nothing } from '../utils/function.js';
	import { move } from '../utils/graph.js';
	import { back, word, end } from '../utils/motions.js';
	import { focus, cursor, mode, focused, selection, nodes } from '../stores.js';
	import { sizes } from '../config.js';
	import specs from '../specs.js';

	const { step, grid } = sizes;

	const edit = getContext('edit');

	const modeEquals = thunkify(x => $mode === x);

	const setMode = thunkify(mode.set);

	const updateCursor = thunkify(cursor.update);

	const motion = thunkify(fn => cursor.set(fn($cursor, $nodes)));

	const moveNode = thunkify(x => {
		buf(id => {
			const node = $nodes.find(idEq(id));
			if (node) {
				node.update(move(x));
			}
		});

		updateCursor(x)();
	});

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
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[whereEq({ key: 'e' }), motion(end)],
		[whereEq({ key: 'w' }), motion(word)],
		[whereEq({ key: 'b' }), motion(back)],
		[
			whereEq({ key: 'o' }),
			pipe(preventDefault, updateCursor({ y: step * 2 }), setMode('insert')),
		],
		/* [whereEq({ key: 'i' }), pipe(preventDefault, setMode('insert'))], */
		[
			whereEq({ key: 'i' }),
			when(modeEquals('normal'), x => {
				if ($focused) {
					preventDefault(x);
					const node = $nodes.find(idEq($focused));
					const spec = specs.get(node.spec);
					edit(spec.code, code => {
						const updateNode = x => x.assign({ updated: Date.now() });
						spec.code = code;
						nodes.filter(propEq('spec', spec.name)).forEach(updateNode);
					});
					focus.set('editor');
				}
			}),
		],
	]);

	const buf = fn => ($selection.length ? $selection : [$focused]).forEach(fn);

	const keydown = cond([
		// global
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[() => $focus.id === 'editor', nothing],
		[whereEq({ key: 'Escape' }), setMode('normal')],
		[modeEquals('insert'), nothing],
		/* [modeEquals('normal'), normal], */
		[() => true, normal],
	]);
</script>

<svelte:window on:keydown|capture={keydown} />
