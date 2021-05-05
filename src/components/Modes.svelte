<script>
	import { cond, __, whereEq, pipe, juxt, both, test, prop, thunkify, isNil, ifElse } from 'ramda';
	import { stopPropagation, preventDefault } from '../utils/dom.js';
	import { focus, thunks, nodes, visual, cursor, selection } from '../stores.js';
	import { safe, nothing } from '../utils/function.js';
	import { moveBy } from '../utils/graph.js';
	import { back, word, end } from '../utils/motions.js';
	import { intersect, findFromPoint } from '../utils/relation.js';
	import { bindAll, notNil } from '../utils/object.js';
	import { sizes } from '../config.js';

	const { setSelection, setMode, modeEq, focusEq, updateCursor } = thunks;

	const { remove } = bindAll(nodes);

	const removeSelection = () => $selection.forEach(id => remove({ id }));

	const isMovement = pipe(prop('key'), test(/^(0|\$|g|G|l|h|j|k|w|e|b)$/));

	const noMods = whereEq({ ctrlKey: false });

	const update = () => selection.set($nodes.filter(intersect($visual)).map(prop('id')));

	const nodeFromPoint = () => findFromPoint($cursor, $nodes);

	const motion = thunkify(fn => cursor.set(fn($cursor, $nodes)));

	const move = thunkify(vector => {
		const selected = selection.get().map(nodes.byId);
		const xs = selected.length ? selected : [nodeFromPoint()];

		xs.filter(notNil).forEach(x => x.update(moveBy(vector)));

		cursor.update(vector);
	});

	const editSpec = () => {};

	const normalMode = cond([
		[whereEq({ key: 'l', ctrlKey: true }), move({ x: sizes.step })],
		[whereEq({ key: 'h', ctrlKey: true }), move({ x: -sizes.step })],
		[whereEq({ key: 'j', ctrlKey: true }), move({ y: sizes.step })],
		[whereEq({ key: 'k', ctrlKey: true }), move({ y: -sizes.step })],
		[whereEq({ key: '0' }), updateCursor({ x: -sizes.grid })],
		[whereEq({ key: '$' }), updateCursor({ x: sizes.grid })],
		[whereEq({ key: 'g' }), updateCursor({ y: -sizes.grid })],
		[whereEq({ key: 'G' }), updateCursor({ y: sizes.grid })],
		[whereEq({ key: 'l' }), updateCursor({ x: sizes.step })],
		[whereEq({ key: 'h' }), updateCursor({ x: -sizes.step })],
		[whereEq({ key: 'j' }), updateCursor({ y: sizes.step })],
		[whereEq({ key: 'k' }), updateCursor({ y: -sizes.step })],
		[whereEq({ key: 'x' }), pipe(nodeFromPoint, safe(remove))],
		[whereEq({ key: 'e' }), motion(end)],
		[whereEq({ key: 'w' }), motion(word)],
		[whereEq({ key: 'b' }), motion(back)],
		[whereEq({ key: 'f' }), setMode('connect')],
		[whereEq({ key: 't' }), setMode('to')],
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[whereEq({ key: 'f' }), setMode('select-spec')],
		[
			whereEq({ key: 'i' }),
			pipe(preventDefault, nodeFromPoint, ifElse(isNil, setMode('new-node'), editSpec)),
		],
	]);

	const visualMode = cond([
		[both(isMovement, noMods), pipe(normalMode, update)],
		[isMovement, pipe(normalMode, setMode('normal'))],
		[whereEq({ key: 'x' }), juxt([removeSelection, setSelection([]), setMode('normal')])],
	]);

	const keydown = cond([
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[focusEq('editor'), nothing],
		[whereEq({ key: 'Escape' }), juxt([setSelection([]), setMode('normal')])],
		[modeEq('insert'), nothing],
		[whereEq({ key: 'p', ctrlKey: true }), setMode('select-menu')],
		[whereEq({ key: 'f' }), setMode('connect')],
		[whereEq({ key: 't' }), setMode('to')],
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[modeEq('normal'), normalMode],
		[modeEq('visual'), visualMode],
		[modeEq('visual-line'), visualMode],
	]);
</script>

<svelte:window on:keydown|capture={keydown} />
