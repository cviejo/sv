import { invoker, tap } from 'ramda';
import { pickRename } from './object';

const stopPropagation = tap(invoker(0, 'stopPropagation'));

const preventDefault = tap(invoker(0, 'preventDefault'));

const offsetRect = pickRename({
	offsetTop: 'y',
	offsetLeft: 'x',
	offsetWidth: 'width',
	offsetHeight: 'height',
});

const center = ({ x, y, width, height }) => ({ x: x + width / 2, y: y + height / 2 });

export { stopPropagation, preventDefault, center, offsetRect };
