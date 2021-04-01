import { sortBy, curry, useWith, map } from 'ramda';
import { distance } from './relation';
import { I } from './combinators';

const next = curry((distanceToOrigin, loc, locs) => {
	const posDistance = distanceToOrigin(loc);

	const sorted = sortBy(distanceToOrigin, locs);
	const node = sorted.find(x => distanceToOrigin(x) > posDistance);

	return node || sorted[0] || loc;
});

const bottomRight = x => ({ x: x.x + x.width, y: x.y + x.height });

const word = next(distance({ x: -1, y: 0 }));

const back = next(distance({ x: 9999999999, y: 9999999999 }));

const end = useWith(word, [I, map(bottomRight)]);

export { word, end, back };
