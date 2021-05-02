import { complement, replace, __, curry, includes, flip, reverse } from 'ramda';

const remove = replace(__, '');

const included = flip(includes);

const notIncluded = complement(included);

const append = curry((a, b) => `${b}${a}`);

// code taken from: https://github.com/philc/vimium
const hintStrings = (chars, count) => {
	const xs = [''];
	let offset = 0;
	while (xs.length - offset < count || xs.length === 1) {
		const hint = xs[offset++];
		for (let ch of chars) {
			xs.push(ch + hint);
		}
	}

	return xs
		.slice(offset, offset + count)
		.sort()
		.map(reverse);
};

export { notIncluded, remove, append, hintStrings };
