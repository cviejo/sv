import { pipe, curry } from 'ramda';
import { pickRename } from './object';

const byId = (x) => document.getElementById(x);

const assign = curry((a, b) => Object.assign(a, b));

// const setSize = curry((size, node) => assign(byId(node.id).style, size));
const setSize = curry((size, node) => assign(byId(node.id).style, size));

const getSize = pipe(byId, pickRename({ offsetWidth: 'width', offsetHeight: 'height' }));

const resetSize = setSize({ width: '', height: '' });

export { byId, assign, getSize, setSize, resetSize };
