import { whereEq, unless, append, reject, pipe } from 'ramda';
import { findEq } from '../utils/list.js';
import { withId } from '../utils/impure.js';
import writable from './writable.js';

const { subscribe, update, get } = writable([]);

const appenWithId = pipe(withId, append);

const add = x => update(unless(findEq(x), appenWithId(x)));

const remove = pipe(whereEq, reject, update);

const find = x => get().filter(whereEq(x));

const edges = { subscribe, add, remove, get, find };

export default edges;
