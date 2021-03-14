import { curry, propEq, whereEq, find, useWith, inc, prop, modulo } from 'ramda';
import { id } from './function';

const next = useWith(modulo, [inc, prop('length')]);

const findEq = useWith(find, [whereEq, id]);

const findByProp = curry((key, value, xs) => xs.find(propEq(key, value)));

export { next, findByProp, findEq };