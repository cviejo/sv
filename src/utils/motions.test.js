/* eslint-disable no-undef */
// import { add } from 'ramda';
import { word, back } from './motions';

const item = (x, y, id = '') => ({ id, x, y, width: 50, height: 50 });

const a = item(0, 0);
const b = item(150, 150);
const c = item(200, 200);

test('word', () => {
	expect(word(a, [a, b, c])).toEqual(b);
	expect(word(a, [b, a, c])).toEqual(b);
	expect(word(c, [b, a, c])).toEqual(a);
	expect(word(item(0, 25), [item(0, 25), item(25, 0)])).toEqual(item(25, 0));
	expect(word(item(25, 0), [item(0, 25), item(25, 0)])).toEqual(item(0, 25));

	expect(word(a, [])).toEqual(a);
});

test('back', () => {
	expect(back(c, [a, b, c])).toEqual(b);
	expect(back(b, [a, c])).toEqual(a);
});
