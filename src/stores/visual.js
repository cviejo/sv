import { writable, derived } from 'svelte/store';
import { test, max, compose, min, when, __, repeat, update } from 'ramda';
import mode from './mode.js';
import cursor from './cursor.js';
import { sizes } from '../config.js';

const fromTo = writable([
	{ x: 0, y: 0 },
	{ x: 0, y: 0 },
]);

const visualMode = test(/^visual/);

const visualStart = compose(fromTo.set, repeat(__, 2), cursor.get);

const visualMove = compose(fromTo.update, update(1));

const visual = derived([mode, fromTo], ([$mode, [from, to]]) => {
	if (!visualMode($mode)) {
		return { x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
	}

	const left = $mode === 'visual' ? min(from.x, to.x) : 0;
	const top = min(from.y, to.y);
	const right = $mode === 'visual' ? max(from.x, to.x) + sizes.step : sizes.grid;
	const bottom = max(from.y, to.y) + sizes.step;

	const width = $mode === 'visual' ? right - left : sizes.grid;
	const height = bottom - top;

	return { x: left, y: top, top, left, right, bottom, width, height };
});

mode.subscribe(when(visualMode, visualStart));

cursor.subscribe(when(compose(visualMode, mode.get), visualMove));

export default visual;
