import { flip, is, curry, pipeWith, andThen, useWith } from 'ramda';

const id = x => x;

const nothing = () => {};

// unlike `pipeWith(andThen)` this starts the promise chain explicitly
const pipeP = (first, ...fns) =>
	pipeWith(andThen, [(...args) => Promise.resolve(first(...args)), ...fns]);

const composeP = (...fns) => pipeP(...fns.reverse());

const S = curry((a, b, x) => {
	const temp = b(x);

	return is(Promise, temp) ? temp.then(bx => a(x, bx)) : a(x, temp);
});

const S_ = useWith(S, [flip, id, id]);

const forEachAsync = curry((fn, xs) =>
	xs.reduce((acc, x) => acc.then(() => fn(x)), Promise.resolve())
);

export { id, pipeP, composeP, nothing, forEachAsync, S, S_ };
