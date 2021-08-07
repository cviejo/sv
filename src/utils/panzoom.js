import panzoom from 'panzoom';
import { ifElse, divide, flip, multiply, pipe, equals, useWith, map } from 'ramda';
import { mode, cursor } from '../stores.js';
import { sizes } from '../config.js';
import { bindAll, offsetRect } from './object.js';
import { derivedRect } from './relation.js';

const { step } = sizes;

const zoomable = pipe(panzoom, bindAll);

const divideBy = flip(divide);

const scale = useWith(map, [divideBy]);

const scaledViewport = pipe(scale, derivedRect);

const offset = (cursor, viewport) => {
	const { x, y } = cursor;

	if (x + step > viewport.right) {
		return [viewport.right - (x + step), 0];
	}
	if (y + step > viewport.bottom) {
		return [0, viewport.bottom - (y + step)];
	}
	if (x < viewport.left) {
		return [viewport.left - x, 0];
	}
	if (y < viewport.top) {
		return [0, viewport.top - y];
	}
	return [0, 0];
};

export default board => {
	const container = board.parentElement;
	const defaults = { maxZoom: 3.2, minZoom: 0.3, beforeWheel: e => !e.ctrlKey };
	const { pause, resume, getTransform, moveBy } = zoomable(board, defaults);

	mode.subscribe(ifElse(equals('insert'), pause, resume));

	cursor.subscribe($cursor => {
		const { x, y, scale } = getTransform();
		const { width, height } = offsetRect(container);

		const viewport = scaledViewport(scale, { x: -x, y: -y, width, height });

		const move = offset($cursor, viewport);

		moveBy(...move.map(multiply(scale)));
	});

	moveBy(sizes.step, sizes.step);
};
