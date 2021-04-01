import { curry, pipe, __, prop, tap, nth, indexOf } from 'ramda';
import writable from './writable.js';
import { safe } from '../utils/object.js';
import { findByProp } from '../utils/list.js';

const store = writable();

const targets = [];

const focusNode = tap(x => x.node.focus());

const findById = findByProp('id', __, targets);

const nextIndex = x => (x + 1) % targets.length;

const set = pipe(findById, safe(pipe(focusNode, store.set)));

const next = pipe(store.get, indexOf(__, targets), nextIndex, nth(__, targets), prop('id'), set);

const register = curry((node, id) => {
	['addEventListener', 'on']
		.filter(x => node[x])
		.forEach(x => node[x]('mousedown', () => set(id)));

	targets.push({ node, id });
});

const focus = { subscribe: store.subscribe, register, next, set };

export default focus;
