/* eslint-disable no-undef */
import { add } from 'ramda';
import { pipeP } from './function';

const delay = (x) => new Promise((r) => setTimeout(() => r(x), 10));

//----------------------------------------------------
test('pipeP pipes promises', async () => {
	const square = (x) => x * x;

	const fn = pipeP(add, delay, square);

	expect(await fn(2, 3)).toEqual(25);
});
