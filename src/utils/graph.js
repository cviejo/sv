import { concat, prop, clamp, pipe, add, mergeWith, mergeRight, bind } from 'ramda';
import { sizes } from '../config.js';
import nodes from '../stores/nodes.js';
import specs from '../specs.js';
import { remove } from './string.js';
import { pipeP, ap } from './function.js';

const addHeader = (x) => `
	const cacheBust = ${Date.now()};
	// const ui = document.getElementById('$(id)');
	const inlets = [];
	const outlets = [];

	const createIO = (all) => () => {
		const stream = flyd.stream();
		all.push({ stream });
		return stream;
	};

	const inlet = createIO(inlets);
	const outlet = createIO(outlets);
	let _ui = (id) => {
		if(_ui2){
			_ui2(document.getElementById(id))
		}
	};
	let _ui2;
	const ui = fn => {
		_ui2 = fn;
	}

	${x}

	export { inlets, outlets, _ui as ui };
`;

const cleanCode = pipe(remove(/\n\n.*add_css.*\n?/), remove(/.*___SVELTE_HMR_HOT_API.*/));

const dataUri = pipe(btoa, concat('data:text/javascript;base64,'));

const load = (x) => import(x);

const limit = clamp(0, sizes.grid - sizes.step);

const move = mergeWith(pipe(add, limit));

const specCode = pipe(specs.get, prop('code'), addHeader);

const runCode = pipe(prop('spec'), specCode, cleanCode, dataUri, load);

const addNode = pipeP(ap(mergeRight, runCode), bind(nodes.add, nodes));

export { move, limit, runCode, addNode };
