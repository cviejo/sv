import { writable, get } from 'svelte/store';
import { pipe, map } from 'ramda';
import { limit, moveBy, pickPoint } from '../utils/graph.js';

const { subscribe, set, update } = writable({ x: 0, y: 0 });

const cursor = {
	subscribe,
	update: x => update(moveBy(x)),
	set: pipe(pickPoint, map(limit), set),
	get: () => get(cursor),
};

export default cursor;
