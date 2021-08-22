<script>
	import { tick, getContext } from 'svelte';
	import { cond, __, whereEq, pipe, juxt, both, test, propEq, prop } from 'ramda';
	import { thunkify, isNil, ifElse } from 'ramda';
	import Select from '../components/Select.svelte';
	import { stopPropagation, preventDefault } from '../utils/effects.js';
	import { focus, thunks, nodes, visual, cursor, selection, mode } from '../stores.js';
	import { safe, noop, forEachAsync } from '../utils/function.js';
	import { moveBy } from '../utils/graph.js';
	import { back, word, end } from '../utils/motions.js';
	import { intersect, findFromPoint } from '../utils/relation.js';
	import { bindAll, notNil, path } from '../utils/object.js';
	import { sizes } from '../config.js';
	import specs from '../specs.js';

	const { setSelection, setMode, modeEq, focusEq, updateCursor } = thunks;

	const edit = getContext('edit');

	const { remove } = bindAll(nodes);

	const removeSelection = () => $selection.forEach(id => remove({ id }));

	const nodeFromPoint = () => findFromPoint($cursor, $nodes);

	const isMovement = pipe(prop('key'), test(/^(0|\$|g|G|l|h|j|k|w|e|b)$/));

	const noMods = whereEq({ ctrlKey: false });

	const updateSelection = () => selection.set($nodes.filter(intersect($visual)).map(prop('id')));

	const motion = thunkify(fn => cursor.set(fn($cursor, $nodes)));

	const onSpec = pipe(
		path('detail.value'),
		spec => nodes.add({ ...$cursor, spec }),
		setMode('normal')
	);

	const move = thunkify(vector => {
		const xs = $selection.length ? $selection.map(nodes.byId) : [nodeFromPoint()];
		xs.filter(notNil).forEach(x => x.update(moveBy(vector)));

		cursor.update(vector);
	});

	const updateNode = x => tick().then(() => x.assign({ updated: Date.now() }));

	const editSpec = node => {
		const spec = specs.get(node.spec);

		edit(spec.code, code => {
			spec.code = code;
			forEachAsync(updateNode, nodes.filter(propEq('spec', spec.name)));
		});
		focus.set('editor');
	};

	const insert = pipe(nodeFromPoint, ifElse(isNil, setMode('new-node'), editSpec));

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
		[whereEq({ key: 'i' }), pipe(preventDefault, insert)],
	]);

	const visualMode = cond([
		[both(isMovement, noMods), pipe(normalMode, updateSelection)],
		[isMovement, juxt([normalMode, setMode('normal')])],
		[whereEq({ key: 'x' }), juxt([removeSelection, setSelection([]), setMode('normal')])],
	]);

	const keydown = cond([
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[focusEq('editor'), noop],
		[whereEq({ key: 'Escape' }), juxt([setSelection([]), setMode('normal')])],
		[modeEq('insert'), noop],
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

{#if $mode === 'new-node'}
	<Select on:select={onSpec} items={specs.data.map(x => x.name)} />
{/if}

<svelte:window on:keydown|capture={keydown} />
