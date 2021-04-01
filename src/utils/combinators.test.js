/* eslint-disable no-undef */
import { concat, toUpper } from 'ramda';
import { pipeP } from './function';
import { S, S_ } from './combinators';

const delay = x => new Promise(r => setTimeout(() => r(x), 10));

test('S', () => expect(S(concat, toUpper, 'Ap')).toEqual('ApAP'));

test('S promised', () =>
	S(concat, pipeP(toUpper, delay), 'Ap').then(x => expect(x).toEqual('ApAP')));

test('S_', () => expect(S_(concat, toUpper, 'Ap')).toEqual('APAp'));
