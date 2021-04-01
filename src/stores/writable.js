import { writable, get } from 'svelte/store';

// just a regular writable with a getter
export default state => {
	const store = { ...writable(state), get: () => get(store) };

	return store;
};
