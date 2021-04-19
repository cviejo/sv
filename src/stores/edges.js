import { whereEq, when, append, reject, pipe, curry, path, ifElse, unary } from 'ramda';
import { findEq } from '../utils/list.js';
import { withId } from '../utils/impure.js';
import nodes from './nodes';
import writable from './writable.js';

const { subscribe, update, get } = writable([]);

const appenWithId = pipe(withId, append);

const outlet = x => path(['outlets', x.outlet], nodes.byId(x.from));

const inlet = x => path(['inlets', x.inlet], nodes.byId(x.to));

const valid = curry((x, edges) => !findEq(x, edges) && outlet(x) && inlet(x));

const add = x => update(when(valid(x), appenWithId(x)));

const remove = pipe(whereEq, reject, update);

const find = x => findEq(x, get());

const toggle = ifElse(find, unary(remove), add);

const edges = { subscribe, add, remove, get, toggle };

export default edges;
