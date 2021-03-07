import { notEquals } from '../utils/relation.js';

export default (x) => ({
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
		this.listeners.forEach((x) => this.notify(x));
	},
	notify() {},
	...x,
});
