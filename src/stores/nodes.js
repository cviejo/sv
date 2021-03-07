// import { reduxify } from 'svelte-reduxify';
import { pathNotEq, idEq } from '../utils/relation.js';
import proxy from './proxy.js';
import edges from './edges.js';

let graph = [];

const node = (x) =>
	proxy({
		...x,
		updated: null,
		update(fn) {
			Object.assign(this, fn(this));
			this.changed();
			return this;
		},
		assign(x) {
			return this.update(() => x);
		},
		notify(listener) {
			listener(this);
		},
	});

const nodes = proxy({
	add(x) {
		graph.push(node(x));
		this.changed();
	},
	remove(id) {
		edges.remove({ from: id });
		edges.remove({ to: id });

		graph = graph.filter(pathNotEq('id', id));

		this.changed();
	},
	filter: (fn) => graph.filter(fn),
	find: (fn) => graph.find(fn),
	get: (id) => graph.find(idEq(id)),
	notify: (listener) => listener(graph),
});

export default nodes;
