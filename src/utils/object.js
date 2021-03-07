import { unless, isNil, useWith, split, pick, propOr, curry, path, pipe, last } from 'ramda';
import { valuesIn, toPairsIn, is, bind } from 'ramda';
import { id } from './function.js';

const dotPath = useWith(path, [split('.'), id]);

const safe = unless(isNil);

const propOrKey = curry((key, x) => propOr(key, key, x));

const renameKeys = curry((keys, obj) =>
	toPairsIn(obj).reduce((acc, [key, value]) => ({ ...acc, [propOrKey(key, keys)]: value }), {})
);

const pickRename = curry((keys, obj) => pick(valuesIn(keys), renameKeys(keys, obj)));

const bindAll = (obj) =>
	toPairsIn(obj)
		.filter(pipe(last, is(Function)))
		.reduce((acc, [key, value]) => ({ ...acc, [key]: bind(value, obj) }), {});

export { dotPath as path, toPairsIn, safe, bindAll, renameKeys, pickRename };
