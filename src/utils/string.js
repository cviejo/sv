import { replace, __, curry } from 'ramda';

const remove = replace(__, '');

const append = curry((a, b) => `${b}${a}`);

const log = curry((label, x) => {
	console.log(label, x);
	return x;
});

export { remove, log, append };
