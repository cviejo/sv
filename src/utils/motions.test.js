/* eslint-disable no-undef */
import { w, b as back } from './motions';

const item = (x, y, id = '') => ({ id, x, y, width: 50, height: 50 });

const a = item(0, 0);
const b = item(150, 150);
const c = item(200, 200);

test('w', () => {
	expect(w(a, [a, b, c])).toEqual(b);
	expect(w(a, [b, a, c])).toEqual(b);
	expect(w(c, [b, a, c])).toEqual(a);
	expect(w(item(0, 25), [item(0, 25), item(25, 0)])).toEqual(item(25, 0));
	expect(w(item(25, 0), [item(0, 25), item(25, 0)])).toEqual(item(0, 25));

	expect(w(a, [])).toEqual(a);
});

test('b', () => {
	expect(back(c, [a, b, c])).toEqual(b);
	expect(back(b, [a, c])).toEqual(a);
});
