/* eslint-disable no-undef */
import { moveBy } from '../utils/graph.js';

// test('addNode', () => addNode({ id: '0', spec: 'hi' }));
test('moveBy', () => {
	expect(moveBy({ x: 5, y: 5 }, { x: 5, y: 5, id: 'id' })).toEqual({ x: 10, y: 10, id: 'id' });
});
