import { unless, isNil, useWith, split, pick, propOr, curry, path, pipe, last } from 'ramda';
import { map, valuesIn, mergeRight, toPairsIn, is, bind, complement, whereEq } from 'ramda';
import { S, I } from './combinators.js';

const bindAll = obj =>
	toPairsIn(obj)
		.filter(pipe(last, is(Function)))
		.reduce((acc, [key, value]) => ({ ...acc, [key]: bind(value, obj) }), {});

const dotPath = useWith(path, [split('.'), I]);

const whereNotEq = complement(whereEq);

const mergeResult = S(mergeRight);

const pickWith = curry((props, fn, x) => pipe(pick(props), map(fn))(x));

const propOrKey = curry((key, x) => propOr(key, key, x));

const renameKeys = curry((keys, obj) =>
	toPairsIn(obj).reduce((acc, [key, value]) => ({ ...acc, [propOrKey(key, keys)]: value }), {})
);

const pickRename = curry((keys, obj) => pick(valuesIn(keys), renameKeys(keys, obj)));

const safe = unless(isNil);

export { whereNotEq };
export { dotPath as path, toPairsIn, safe, bindAll, renameKeys, pickRename, mergeResult, pickWith };
