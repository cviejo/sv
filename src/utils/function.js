import { curry, pipeWith, nAry, unapply, unless, isNil, is } from 'ramda';

const isPromise = is(Promise);

const noop = () => {};

const nullary = nAry(0);

const safe = unless(isNil);

const pipe = unapply(pipeWith((fn, acc) => (isPromise(acc) ? acc.then(fn) : fn(acc))));

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { pipe, noop, nullary, forEachAsync, safe };
