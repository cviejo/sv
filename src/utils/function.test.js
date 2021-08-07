/* eslint-disable no-undef */
import { add } from 'ramda';
import { pipe } from './function';

const delay = x => new Promise(r => setTimeout(() => r(x), 10));

test('pipe pipes promises', async () => {
	const square = x => x * x;

	const fn = pipe(add, delay, square);

	expect(await fn(2, 3)).toEqual(25);
});
