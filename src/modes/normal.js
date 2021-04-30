import { pipe, cond, whereEq, thunkify, curry, isNil, ifElse } from 'ramda';
import { moveBy } from '../utils/graph.js';
import { thunks } from '../stores.js';
import { back, word, end } from '../utils/motions.js';
import { pointInRect } from '../utils/relation.js';
import { bindAll } from '../utils/object.js';
import { safe, nothing } from '../utils/function.js';
import { nodes, cursor } from '../stores.js';
import { sizes } from '../config.js';

const { step, grid } = sizes;

const { updateCursor, setMode } = thunks;

const { remove } = bindAll(nodes);

const findUnderPoint = (pos, xs) => xs.find(pointInRect(pos));

const nodeUnderCursor = () => findUnderPoint(cursor.get(), nodes.get());

const updateNode = curry((fn, x) => x && x.update(fn));

const motion = thunkify(fn => cursor.set(fn(cursor.get(), nodes.get())));

const moveNode = vector => pipe(nodeUnderCursor, updateNode(moveBy(vector)), updateCursor(vector));

export default cond([
	[whereEq({ key: 'l', ctrlKey: true }), moveNode({ x: step })],
	[whereEq({ key: 'h', ctrlKey: true }), moveNode({ x: -step })],
	[whereEq({ key: 'j', ctrlKey: true }), moveNode({ y: step })],
	[whereEq({ key: 'k', ctrlKey: true }), moveNode({ y: -step })],
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
	[whereEq({ key: 'f' }), pipe(nodeUnderCursor, ifElse(isNil, setMode('insert'), nothing))],
]);
