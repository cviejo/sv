<script>
	import { getContext } from 'svelte';
	import { when, cond, equals, nth, __, identity, unless, whereEq } from 'ramda';
	import { append, pipe, reject, reverse, thunkify } from 'ramda';
	import { preventDefault, stopPropagation } from '../utils/dom.js';
	import { sortByDistance, idEq } from '../utils/relation.js';
	import { next } from '../utils/list.js';
	import { nothing } from '../utils/function.js';
	import { move } from '../utils/graph.js';
	import { focus, cursor, mode, focused, selection, nodes } from '../stores.js';
	import { sizes } from '../config.js';
	import specs from '../specs.js';

	const { step, grid } = sizes;

	const editor = getContext('editor');

	const modeEquals = thunkify(x => $mode === x);

	const setMode = thunkify(mode.set);

	const updateCursor = thunkify(cursor.update);

	const graphEmpty = () => !$nodes.length;

	const word = thunkify(direction => {
		const sort = pipe(reject(whereEq($cursor)), append($cursor), sortByDistance, direction);
		const list = sort($nodes);

		const cursorIndex = list.findIndex(equals($cursor));
		const nextNode = pipe(next(cursorIndex), nth(__, list));

		const node = nextNode(list);

		cursor.set({ x: node.x, y: node.y });

		return node;
	});

	const wordEnd = () => {
		// todo: this works better removing reject(whereEq($cursor)) from word, not sure how to refactor
		const nextNode = word(reverse);
		const node = nextNode();

		cursor.set({ x: node.x + node.width - step, y: node.y + node.height - step });
		/* cursor.update((x) => ({ x: x.x + node.width, y: x.y + node.height })); */
	};

	const moveNode = thunkify(x => {
		buf(id => {
			const node = $nodes.find(idEq(id));
			if (node) {
				node.update(move(x));
			}
		});

		updateCursor(x)();
	});

	const buf = fn => ($selection.length ? $selection : [$focused]).forEach(fn);

	const keydown = cond([
		[whereEq({ key: 'w', ctrlKey: true }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'K' }), pipe(stopPropagation, focus.next)],
		[whereEq({ key: 'J' }), pipe(stopPropagation, focus.next)],
		[() => $focus.id === 'editor', nothing],
		[whereEq({ key: 'Escape' }), setMode('normal')],
		[modeEquals('insert'), nothing],
		/* [whereEq({ key: 'l', ctrlKey: true }), updateCursor({ x: region / 2 })], */
		[whereEq({ key: 'l', ctrlKey: true }), moveNode({ x: step })],
		[whereEq({ key: 'h', ctrlKey: true }), moveNode({ x: -step })],
		[whereEq({ key: 'j', ctrlKey: true }), moveNode({ y: step })],
		[whereEq({ key: 'k', ctrlKey: true }), moveNode({ y: -step })],
		[whereEq({ key: 'x' }), () => buf(x => nodes.remove(x))],
		/* [whereEq({ key: 'i' }), pipe(preventDefault, setMode('insert'))], */
		[
			whereEq({ key: 'i' }),
			when(modeEquals('normal'), x => {
				if ($focused) {
					preventDefault(x);
					const { spec } = $nodes.find(idEq($focused));
					editor.editSpec(specs.get(spec));
					focus.set('editor');
				}
			}),
		],
		[whereEq({ key: '0' }), updateCursor({ x: -grid })],
		[whereEq({ key: '$' }), updateCursor({ x: grid })],
		[whereEq({ key: 'g' }), updateCursor({ y: -grid })],
		[whereEq({ key: 'G' }), updateCursor({ y: grid })],
		[whereEq({ key: 'l' }), updateCursor({ x: step })],
		[whereEq({ key: 'h' }), updateCursor({ x: -step })],
		[whereEq({ key: 'j' }), updateCursor({ y: step })],
		[whereEq({ key: 'k' }), updateCursor({ y: -step })],
		[whereEq({ key: 'v' }), setMode('visual')],
		[whereEq({ key: 'e' }), unless(graphEmpty, wordEnd)],
		[whereEq({ key: 'w' }), unless(graphEmpty, word(reverse))],
		[whereEq({ key: 'b' }), unless(graphEmpty, word(identity))],
		[whereEq({ key: 'V' }), setMode('visual-line')],
		[
			whereEq({ key: 'o' }),
			pipe(preventDefault, updateCursor({ y: step * 2 }), setMode('insert')),
		],
	]);
</script>

<svelte:window on:keydown|capture={keydown} />
