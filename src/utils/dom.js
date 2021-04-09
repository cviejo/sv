import { invoker } from 'ramda';
import { pickRename } from './object';

const stopPropagation = invoker(0, 'stopPropagation');

const preventDefault = invoker(0, 'preventDefault');

const offset = pickRename({
	offsetTop: 'top',
	offsetLeft: 'left',
	offsetWidth: 'width',
	offsetHeight: 'height',
});

const rect = elem => {
	const { top, left, width, height } = offset(elem);
	const parent = offset(elem.offsetParent);

	return { x: parent.left + left, y: parent.top + top, width, height };
};

const center = elem => {
	const { x, y, width, height } = rect(elem);

	return { x: x + width / 2, y: y + height / 2 };
};

export { stopPropagation, preventDefault, rect, center };
