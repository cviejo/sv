import { pipe, prop, curry, useWith } from 'ramda';
import { v4 as uuid } from 'uuid';
import { pickRename } from './object';
import { I } from './combinators';

const byId = x => document.getElementById(x);

const load = x => import(x);

const withId = x => ({ id: uuid(), ...x });

const element = pipe(prop('id'), byId);

const assign = curry((a, b) => Object.assign(b, a));

const style = pipe(element, prop('style'));

const getSize = pipe(element, pickRename({ offsetWidth: 'width', offsetHeight: 'height' }));

const setSize = useWith(assign, [I, style]);

const resetSize = assign({ width: '', height: '' });

const log = curry((label, x) => {
	console.log(label, x);
	return x;
});

export { byId, assign, getSize, setSize, resetSize, withId, load, log };
