import { curry, pipeWith, andThen, identity } from 'ramda';

// Unlike `pipeWith(andThen)` this starts the promise chain explicitely
const pipeP = (first, ...fns) =>
	pipeWith(andThen, [(...args) => Promise.resolve(first(...args)), ...fns]);

const composeP = (...fns) => pipeP(...fns.reverse());

const nothing = () => {};

const ap = curry(async (a, b, x) => a(x, await b(x)));

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { identity as id, pipeP, composeP, nothing, forEachAsync, ap };
