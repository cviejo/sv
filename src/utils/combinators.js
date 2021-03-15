import { curry, is, useWith, flip } from 'ramda';

const I = x => x;

const S = curry((a, b, x) => {
	const temp = b(x);

	return is(Promise, temp) ? temp.then(bx => a(x, bx)) : a(x, temp);
});

const S_ = useWith(S, [flip, I, I]);

export { I, S, S_ };
