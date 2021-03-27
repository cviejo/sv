import { concat, prop, clamp, pipe, add, mergeWith, mergeRight, bind } from 'ramda';
import { sizes } from '../config.js';
import nodes from '../stores/nodes.js';
import specs from '../specs.js';
import { remove } from './string.js';
import { pipeP } from './function.js';
import { S } from './combinators.js';

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

const load = x => import(x);

const limit = clamp(0, sizes.grid - sizes.step);

const move = mergeWith(pipe(add, limit));

const specCode = pipe(specs.get, prop('code'), cleanCode, addHeader);

const runCode = pipe(prop('spec'), specCode, dataUri, load);

const addNode = pipeP(S(mergeRight, runCode), bind(nodes.add, nodes));

export { move, limit, runCode, addNode };
