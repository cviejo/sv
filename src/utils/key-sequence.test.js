import { whereEq } from 'ramda';
import sequence from './key-sequence.js';

//----------------------------------------------------
test('pipeP pipes promises', async () => {
	const press = sequence([{ id: 'aha', keys: [whereEq({ key: 'g' }), whereEq({ key: 'g' })] }]);

	press({ key: 'g' });
	press({ key: 'g' });

	// const add = (x) => x + x;
	// const square = (x) => x * x;
	//
	// const fn = pipeP(add, delay(100), square);
	//
	// expect(await fn(2, 3)).toEqual(25);
});
