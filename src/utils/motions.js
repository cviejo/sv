import { sortBy, curry, useWith, map } from 'ramda';
import { sizes } from '../config.js';
import { distance } from './relation';
import { moveBy } from './graph';
import { I } from './combinators';

const bottomRight = x => moveBy({ x: x.width - sizes.step, y: x.height - sizes.step }, x);

const next = curry((distanceToOrigin, loc, locs) => {
	const posDistance = distanceToOrigin(loc);

	const sorted = sortBy(distanceToOrigin, locs);
	const node = sorted.find(x => distanceToOrigin(x) > posDistance);

	return node || sorted[0] || loc;
});

const w = next(distance({ x: -1, y: 0 }));

const b = next(distance({ x: 9999999999, y: 9999999999 }));

const e = useWith(w, [I, map(bottomRight)]);

export { w, b, e };
