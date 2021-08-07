import { invoker, tap, pipe, prop, curry, useWith } from 'ramda';
import { v4 as uuid } from 'uuid';
import { pickRename } from './object';
import { I } from './combinators';

const byId = x => document.getElementById(x);

const stopPropagation = tap(invoker(0, 'stopPropagation'));

const preventDefault = tap(invoker(0, 'preventDefault'));

const load = x => import(x);

const withId = x => ({ id: uuid(), ...x });

const element = pipe(prop('id'), byId);

const assign = curry((a, b) => Object.assign(b, a));

const style = pipe(element, prop('style'));

const getSize = pipe(element, pickRename({ offsetWidth: 'width', offsetHeight: 'height' }));

const setSize = useWith(assign, [I, style]);

const resetSize = assign({ width: '', height: '' });

const dispatchEvent = curry(
	(node, type, detail) => node && node.dispatchEvent(new CustomEvent(type, { detail }))
);

const log = curry((label, x) => {
	console.log(label, x);
	return x;
});

export { stopPropagation, preventDefault };
export { byId, assign, getSize, setSize, resetSize, dispatchEvent, withId, load, log };
