import { flip, is, curry, pipeWith, andThen, identity } from 'ramda';

// Unlike `pipeWith(andThen)` this starts the promise chain explicitely
const pipeP = (first, ...fns) =>
	pipeWith(andThen, [(...args) => Promise.resolve(first(...args)), ...fns]);

const composeP = (...fns) => pipeP(...fns.reverse());

const nothing = () => {};

const S = curry((a, b, x) => {
	const temp = b(x);

	return is(Promise, temp) ? temp.then(bx => a(x, bx)) : a(x, temp);
});

const S_ = curry((a, b, x) => S(flip(a), b, x));

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { identity as id, pipeP, composeP, nothing, forEachAsync, S, S_ };
