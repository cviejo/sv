/* eslint-disable no-undef */
import { add } from 'ramda';
import { pickWith, bindAll } from './object';

test('bindAll', () => {
	const { addX, subtract } = bindAll({
		x: 3,
		addX(x) {
			return x + this.x;
		},
		subtract(x) {
			return x - this.x;
		},
	});

	expect(addX(1)).toEqual(4);
	expect(subtract(9)).toEqual(6);
});

test('pickWith', () =>
	expect(pickWith(['w', 'h'], add(1), { id: 'id', w: 0, h: 20 })).toEqual({ w: 1, h: 21 }));
