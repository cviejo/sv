import { writable, get } from 'svelte/store';
import { pipe, map, pick } from 'ramda';
import { limit, move } from '../utils/graph.js';

const { subscribe, set, update } = writable({ x: 0, y: 0 });

const cursor = {
	subscribe,
	update: x => update(move(x)),
	set: pipe(pick(['x', 'y']), map(limit), set),
	get: () => get(cursor),
};

export default cursor;
