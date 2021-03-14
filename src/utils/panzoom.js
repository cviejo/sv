import panzoom from 'panzoom';
import { ifElse, divide, __, multiply, pipe, equals } from 'ramda';
import { mode, cursor } from '../stores.js';
import { sizes } from '../config.js';
import { bindAll } from './object.js';

const zoomable = pipe(panzoom, bindAll);

const viewport = (width, height, transform) => {
	const scale = divide(__, transform.scale);

	const top = scale(-transform.y);
	const left = scale(-transform.x);
	const right = scale(width) + left;
	const bottom = scale(height) + top;

	return { top, left, right, bottom };
};

const offset = (cursor, step, viewport) => {
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
	const { pause, resume, getTransform, moveBy } = zoomable(board, {
		maxZoom: 3.2,
		minZoom: 0.3,
		beforeWheel: e => !e.ctrlKey,
	});

	mode.subscribe(ifElse(equals('insert'), pause, resume));

	cursor.subscribe(x => {
		const width = container.offsetWidth;
		const height = container.offsetHeight;

		const transform = getTransform();
		const move = offset(x, sizes.step, viewport(width, height, transform));

		moveBy(...move.map(multiply(transform.scale)));
	});

	cursor.set({ x: 0, y: 0 });

	moveBy(sizes.step, sizes.step);
};
