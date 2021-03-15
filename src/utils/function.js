import { curry, pipeWith, andThen } from 'ramda';

const nothing = () => {};

// unlike `pipeWith(andThen)` this starts the promise chain explicitly
const pipeP = (first, ...fns) =>
	pipeWith(andThen, [(...args) => Promise.resolve(first(...args)), ...fns]);

const composeP = (...fns) => pipeP(...fns.reverse());

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { pipeP, composeP, nothing, forEachAsync };
