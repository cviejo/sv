import { useWith, curry, sortBy, pathEq, complement, split, equals, lte, gt } from 'ramda';
import { propEq } from 'ramda';
import { id } from './function.js';

const derivedRect = rect => ({
	top: rect.y,
	left: rect.x,
	right: rect.x + rect.width,
	bottom: rect.y + rect.height,
});

const distance = curry((a, b) => a.x - b.x + (a.y - b.y));

const fill = curry((step, x) => x + step - ((x - 1) % step) - 1);

const sortByDistance = sortBy(distance({ x: 0, y: 0 }));

const notEquals = complement(equals);

const dotPathEq = useWith(pathEq, [split('.'), id, id]);

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
export { distance, sortByDistance, pathNotEq, notEquals, withinRect, intersect };
