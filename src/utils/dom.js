import { invoker } from 'ramda';

const stopPropagation = invoker(0, 'stopPropagation');

const preventDefault = invoker(0, 'preventDefault');

const elementCenter = x => ({
	x: x.offsetParent.offsetLeft + x.offsetLeft + x.offsetWidth / 2,
	y: x.offsetParent.offsetTop + x.offsetTop + x.offsetHeight / 2,
});

export { stopPropagation, preventDefault, elementCenter };
