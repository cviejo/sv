import { whereEq, curry, unless, append, reject, pipe } from 'ramda';
import { writable } from 'svelte/store';

const { subscribe, update } = writable([]);

const has = curry((x, xs) => xs.find(whereEq(x)));

const add = (x) => update(unless(has(x), append(x)));

const remove = pipe(whereEq, reject, update);

const edges = { subscribe, add, remove };

export default edges;
