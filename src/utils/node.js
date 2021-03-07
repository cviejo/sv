import { when, lt, subtract, __, pipe, prop } from 'ramda';
import { sizes } from '../config.js';
import { byId } from './impure.js';
import { safe } from './object.js';

const ioCount = when(lt(2), subtract(__, 2));

const fill = (step, x) => x + step - ((x - 1) % step) - 1;

const invoke = safe((x) => x());

const runDefault = pipe(prop('default'), invoke);

function resize(id) {
	const { offsetWidth, offsetHeight, style } = byId(id);

	const width = fill(sizes.step, offsetWidth);
	const height = fill(sizes.step, offsetHeight);

	style.width = `${width}px`;
	style.height = `${height}px`;

	return { width, height };
}

export { ioCount, resize, runDefault };
