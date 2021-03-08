/* eslint-disable no-undef */
import { add, concat, toUpper } from 'ramda';
import { pipeP, S } from './function';

const delay = x => new Promise(r => setTimeout(() => r(x), 10));

//----------------------------------------------------
test('pipeP pipes promises', async () => {
	const square = x => x * x;

	const fn = pipeP(add, delay, square);

	expect(await fn(2, 3)).toEqual(25);
});

//----------------------------------------------------
test('S', () => {
	expect(S(concat, toUpper, 'Ap')).toEqual('ApAP');
});

//----------------------------------------------------
test('S promised', () =>
	S(concat, pipeP(toUpper, delay), 'Ap').then(x => expect(x).toEqual('ApAP')));
