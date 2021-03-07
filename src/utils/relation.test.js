/* eslint-disable no-undef */
import { intersect, fill } from './relation.js';

//----------------------------------------------------
test('intersect', async () => {
	const rect = { x: 100, y: 100, width: 10, height: 10 };

	expect(intersect({ x: 0, y: 0, width: 50, height: 50 }, rect)).toEqual(false);
	expect(intersect({ x: 0, y: 100, width: 150, height: 50 }, rect)).toEqual(true);
});

//----------------------------------------------------
test('fill', async () => {
	expect(fill(20, 58)).toEqual(60);
	expect(fill(12, 1)).toEqual(12);
});
