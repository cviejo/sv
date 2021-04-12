import { curry, propEq, whereEq, find, useWith } from 'ramda';
import { I } from './combinators';

const findEq = useWith(find, [whereEq, I]);

const findByProp = curry((key, value, xs) => xs.find(propEq(key, value)));

export { findByProp, findEq };
