import { pipe, cond, whereEq, thunkify, isNil, ifElse, complement } from 'ramda';
import { moveBy } from '../utils/graph.js';
import { back, word, end } from '../utils/motions.js';
import { findFromPoint } from '../utils/relation.js';
import { bindAll } from '../utils/object.js';
import { safe } from '../utils/function.js';
import { nodes, cursor, thunks, selection } from '../stores.js';
import { sizes } from '../config.js';

const { step, grid } = sizes;

const { updateCursor, setMode } = thunks;

const { remove } = bindAll(nodes);

const notNil = complement(isNil);

const nodeUnderCursor = () => findFromPoint(cursor.get(), nodes.get());

const motion = thunkify(fn => cursor.set(fn(cursor.get(), nodes.get())));

const move = thunkify(vector => {
	const selected = selection.get().map(nodes.byId);
	const xs = selected.length ? selected : [nodeUnderCursor()];

	xs.filter(notNil).forEach(x => x.update(moveBy(vector)));

	cursor.update(vector);
});

const editSpec = () => {};

export default cond([
	[whereEq({ key: 'l', ctrlKey: true }), move({ x: step })],
	[whereEq({ key: 'h', ctrlKey: true }), move({ x: -step })],
	[whereEq({ key: 'j', ctrlKey: true }), move({ y: step })],
	[whereEq({ key: 'k', ctrlKey: true }), move({ y: -step })],
	[whereEq({ key: 'x' }), pipe(nodeUnderCursor, safe(remove))],
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
	[whereEq({ key: 'f' }), setMode('connect')],
	[whereEq({ key: 't' }), setMode('to')],
	[whereEq({ key: 'v' }), setMode('visual')],
	[whereEq({ key: 'V' }), setMode('visual-line')],
	[whereEq({ key: 'f' }), setMode('select-spec')],
	[whereEq({ key: 'i' }), pipe(nodeUnderCursor, ifElse(isNil, setMode('insert'), editSpec))],
]);

// 	node => {
// 	edit(spec.code, code => {
// 		/* const updateNode = x => (x.assign({ updated: Date.now() }), tick()); */
// 		const updateNode = x => tick().then(() => x.assign({ updated: Date.now() }));
// 		spec.code = code;
// 		forEachAsync(updateNode, nodes.filter(propEq('spec', spec.name)));
// 		/* .forEach(updateNode); */
// 	});
// 	focus.set('editor');
// };
// const selectedNodes = () => nodes.get().filter(includedIn(selection.get()));
