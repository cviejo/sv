import { curry, pipe, __, prop, tap, nth, indexOf } from 'ramda';
import writable from './writable.js';
import { safe } from '../utils/function.js';
import { findByProp } from '../utils/list.js';

const targets = [];

const { subscribe, get, ...store } = writable();

const focusNode = tap(x => x.node.focus());

const findById = findByProp('id', __, targets);

const set = pipe(findById, safe(pipe(focusNode, store.set)));

const nextIndex = x => (x + 1) % targets.length;

const next = pipe(get, indexOf(__, targets), nextIndex, nth(__, targets), prop('id'), set);

const register = curry((node, id) => {
	['addEventListener', 'on']
		.filter(x => node[x])
		.forEach(x => node[x]('mousedown', () => set(id)));

	targets.push({ node, id });
});

export default { subscribe, get, set, next, register };
