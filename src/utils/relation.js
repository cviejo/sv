import { useWith, curry, pathEq, complement, split, equals, lte, gt } from 'ramda';
import { propEq } from 'ramda';
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

const withinRect = curry(
	(point, { x, y, width, height }) =>
		between(x, x + width, point.x) && between(y, y + height, point.y)
);

const intersect = useWith(
	(a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom),
	[derivedRect, derivedRect]
);

export { dotPathEq as pathEq, idEq, fill };
export { distance, pathNotEq, notEquals, withinRect, intersect };
