import { whereEq, unless, append, reject, pipe } from 'ramda';
import { writable } from 'svelte/store';
import { findEq } from '../utils/array';

const { subscribe, update } = writable([]);

const add = x => update(unless(findEq(x), append(x)));

const remove = pipe(whereEq, reject, update);

const edges = { subscribe, add, remove };

export default edges;
