import { pathNotEq, idEq, notEquals } from '../utils/relation.js';
import { nothing } from '../utils/function.js';
import edges from './edges.js';

let graph = [];

const find = fn => graph.find(fn);

const proxy = x => ({
	listeners: [],
	subscribe(fn) {
		this.listeners.push(fn);
		this.notify(fn);

		return () => this.unsubscribe(fn);
	},
	unsubscribe(fn) {
		this.listeners = this.listeners.filter(notEquals(fn));
	},
	changed() {
		// can't do forEach(this.smth), this binding will change later
		this.listeners.forEach(x => this.notify(x));
	},
	notify() {},
	...x,
});

const node = x =>
	proxy({
		...x,
		inlets: [],
		outlets: [],
		updated: null,
		update(fn = nothing) {
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
	find,
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
	filter: fn => graph.filter(fn),
	byId: id => find(idEq(id)),
	notify: listener => listener(graph),
});

export default nodes;
