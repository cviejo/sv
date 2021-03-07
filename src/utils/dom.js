import { invoker } from 'ramda';

const stopPropagation = invoker(0, 'stopPropagation');

const preventDefault = invoker(0, 'preventDefault');

export { stopPropagation, preventDefault };
