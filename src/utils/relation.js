import { propEq, useWith, curry, pathEq, complement, split, equals, lte, gt } from 'ramda';
import { I } from './combinators.js';

const derivedRect = rect => ({
	top: rect.y,
	left: rect.x,
	right: rect.x + rect.width,
	bottom: rect.y + rect.height,
});

const distance = curry((a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));

const fill = curry((step, x) => x + step - ((x - 1) % step) - 1);

const notEquals = complement(equals);

const dotPathEq = useWith(pathEq, [split('.'), I, I]);

const pathNotEq = complement(dotPathEq);

const idEq = propEq('id');

const between = curry((a, b, x) => lte(a, x) && gt(b, x));

const pointInRect = curry(
	(point, rect) =>
		between(rect.x, rect.x + rect.width, point.x) &&
		between(rect.y, rect.y + rect.height, point.y)
);

const findFromPoint = (pos, xs) => xs.find(pointInRect(pos));

const intersect = useWith(
	(a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom),
	[derivedRect, derivedRect]
);

export { dotPathEq as pathEq, idEq, fill };
export { distance, pathNotEq, notEquals, pointInRect, findFromPoint, intersect };
