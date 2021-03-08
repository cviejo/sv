/* eslint-disable no-undef */
import { findEq } from './array';

test('findEq', () => {
	const ok = { a: 1, b: 2, ok: 1 };

	expect(findEq({ a: 1, b: 2 }, [{ a: 1 }, { b: 1 }, ok])).toEqual(ok);
});
