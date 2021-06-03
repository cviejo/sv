import { curry, pipeWith, nAry, andThen, unless, isNil } from 'ramda';

const nothing = () => {};

const nullary = nAry(0);

const safe = unless(isNil);

// unlike `pipeWith(andThen)` this starts the promise chain explicitly
const pipeP = (first, ...fns) =>
	pipeWith(andThen, [(...args) => Promise.resolve(first(...args)), ...fns]);

const composeP = (...fns) => pipeP(...fns.reverse());

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { pipeP, composeP, nothing, nullary, forEachAsync, safe };
