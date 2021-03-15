/* eslint-disable no-undef */
import { concat, toUpper } from 'ramda';
import { pipeP, S, S_ } from './combinators';

test('S', () => expect(S(concat, toUpper, 'Ap')).toEqual('ApAP'));

test('S promised', () =>
	S(concat, pipeP(toUpper, delay), 'Ap').then(x => expect(x).toEqual('ApAP')));

test('S_', () => expect(S_(concat, toUpper, 'Ap')).toEqual('APAp'));
