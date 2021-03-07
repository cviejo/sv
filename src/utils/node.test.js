import { ioCount } from './node.js';

test('ioCount', () => {
	expect(ioCount(1)).toEqual(1);
	expect(ioCount(2)).toEqual(2);
	expect(ioCount(3)).toEqual(1);
	expect(ioCount(4)).toEqual(2);
});
