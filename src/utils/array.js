import { curry, propEq, useWith, inc, prop, modulo } from 'ramda';

const next = useWith(modulo, [inc, prop('length')]);

const findByProp = curry((key, value, xs) => xs.find(propEq(key, value)));

export { next, findByProp };
