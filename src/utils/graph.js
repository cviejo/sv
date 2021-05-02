import { concat, prop, clamp, pipe, add, pick, mergeWith, useWith } from 'ramda';
import { sizes } from '../config.js';
import specs from '../specs.js';
import { remove } from './string.js';
import { load } from './impure.js';
import { I } from './combinators.js';

const addHeader = x => `
	const __cacheBust__ = ${Date.now()};
	const __inlets__ = [];
	const __outlets__ = [];
	const __createIO__ = (all) => () => {
		const stream = flyd.stream();
		all.push({ stream });
		return stream;
	};
	let __fn__;
	const __ui__ = (id) => {
		if(__fn__){
			__fn__(document.getElementById(id))
		}
	};

	const ui = fn => {
		__fn__ = fn;
	}
	const inlet = __createIO__(__inlets__);
	const outlet = __createIO__(__outlets__);

	${x}

	export { __inlets__ as inlets , __outlets__ as outlets , __ui__ as ui };
`;

const cleanCode = pipe(remove(/\n\n.*add_css.*\n?/), remove(/.*___SVELTE_HMR_HOT_API.*/));

const dataUri = pipe(btoa, concat('data:text/javascript;base64,'));

const limit = clamp(0, sizes.grid - sizes.step);

const pickPoint = pick(['x', 'y']);

const mergeWithAdd = mergeWith(pipe(add, limit));

const moveBy = useWith(mergeWithAdd, [pickPoint, I]);

const specCode = pipe(specs.get, prop('code'), cleanCode, addHeader);

const runCode = pipe(prop('spec'), specCode, dataUri, load);

export { moveBy, pickPoint, limit, runCode /* , addNode */ };
