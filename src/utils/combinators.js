import { curry, is, useWith, flip } from 'ramda';

const I = x => x;

const S = curry((a, b, x) => {
	const result = b(x);

	return is(Promise, result) ? result.then(bx => a(x, bx)) : a(x, result);
});

const S_ = useWith(S, [flip, I, I]);

export { I, S, S_ };
