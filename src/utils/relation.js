import { propEq, useWith, curry, complement, equals, lte, gt } from 'ramda';

const derivedRect = rect => ({
	top: rect.y,
	left: rect.x,
	right: rect.x + rect.width,
	bottom: rect.y + rect.height,
});

const center = ({ x, y, width, height }) => ({ x: x + width / 2, y: y + height / 2 });

const distance = curry((a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));

const fill = curry((step, x) => x + step - ((x - 1) % step) - 1);

const notEquals = complement(equals);

const propNotEq = complement(propEq);

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

export {
	idEq,
	fill,
	center,
	derivedRect,
	distance,
	notEquals,
	pointInRect,
	propNotEq,
	findFromPoint,
	intersect,
};
