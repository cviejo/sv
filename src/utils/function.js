import { curry, pipeWith, nAry, unapply, flip, useWith, unless, isNil, is } from 'ramda';
import { I } from './combinators.js';

const isPromise = is(Promise);

const noop = () => {};

const nullary = nAry(0);

const safe = unless(isNil);

const accumulator = curry((acc, fn) => (isPromise(acc) ? acc.then(fn) : fn(acc)));

const pipe = unapply(pipeWith(flip(accumulator)));

const reduce = curry((fn, init, xs) => xs.reduce(useWith(accumulator, [I, flip(fn)]), init));

const forEach = curry((fn, xs) => reduce((_, x) => fn(x), null, xs));

const tryCatch = curry((tryer, catcher) => (...args) => {
	try {
		const result = tryer(...args);
		return isPromise(result) ? result.catch(err => catcher(err, args[0])) : result;
	} catch (err) {
		return catcher(err, args[0]);
	}
});

export { pipe, noop, nullary, forEach, safe, tryCatch };
