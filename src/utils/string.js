import { replace, __, curry } from 'ramda';

const remove = replace(__, '');

const append = curry((a, b) => `${b}${a}`);

const log = curry((label, x) => {
	console.log(label, x);
	return x;
});

// code taken from: https://github.com/philc/vimium
const hints = count => {
	const hintChars = 'sadfjklewcmpgh';
	const xs = [''];
	let offset = 0;
	while (xs.length - offset < count || xs.length === 1) {
		const hint = xs[offset++];
		for (let ch of hintChars) {
			xs.push(ch + hint);
		}
	}
	return xs.slice(offset, offset + count);
};

export { remove, log, append, hints };
