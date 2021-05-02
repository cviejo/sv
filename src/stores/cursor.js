import { pipe, map } from 'ramda';
import { limit, moveBy, pickPoint } from '../utils/graph.js';
import writable from './writable.js';

const { set, update, ...store } = writable({ x: 0, y: 0 });

const cursor = {
	...store,
	update: x => update(moveBy(x)),
	set: pipe(pickPoint, map(limit), set),
};

export default cursor;
